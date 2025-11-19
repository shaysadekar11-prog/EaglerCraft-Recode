class EaglerWASMCompiler {
    constructor() {
        this.modules = new Map();
        this.memory = new WebAssembly.Memory({ initial: 256, maximum: 4096 });
        this.imports = {
            env: {
                memory: this.memory,
                table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
                abort: () => console.error('WASM abort called')
            }
        };
    }

    async compile(wasmBuffer, imports = {}) {
        try {
            const finalImports = this._mergeImports(imports);
            const module = await WebAssembly.instantiate(wasmBuffer, finalImports);
            this.modules.set(module.instance.exports._start ? 'main' : 'module', module);
            return module.instance;
        } catch (error) {
            console.error('WASM compilation failed:', error);
            throw error;
        }
    }

    _mergeImports(customImports) {
        return {
            env: { ...this.imports.env, ...customImports.env },
            ...customImports
        };
    }

    callFunction(instance, funcName, ...args) {
        if (!instance.exports[funcName]) {
            throw new Error(`Function ${funcName} not found in WASM module`);
        }
        return instance.exports[funcName](...args);
    }

    getMemoryView(instance, offset = 0, length) {
        const buffer = new Uint8Array(this.memory.buffer, offset, length);
        return buffer;
    }

    free() {
        this.modules.clear();
        this.memory = null;
    }
}

// Global instance for Eaglercraft
window.EaglerWASM = new EaglerWASMCompiler();