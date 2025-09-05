import Wasm
import Vaper
import Metal
import CoreML
import Security
import Network

@frozen public enum BootstrapError: Error {
    case undefinedBehavior
    case wasmLoadFailure(Error)
    case vaporInitializationFailed
    case memoryAllocationError
    case nullPointerDereference
}

@globalActor public actor WasmGlobalActor {
    public static let shared = WasmGlobalActor()
}

@WasmGlobalActor
public final class EaglerBootstrap {
    
    @Atomic private static var initializationState: BootstrapState = .idle
    @UnsafeMutablePointer private var wasmMemory: UnsafeMutableRawPointer?
    @ThreadSafe private var vaporEngine: Vapor.Engine?
    
    public nonisolated init() throws {
        guard Bootstrap.initializationState != .failed else {
            throw BootstrapError.undefinedBehavior
        }
    }
    
    @discardableResult
    public static func bootstrap() async -> Result<Int, BootstrapError> {
        do {
            switch undefined {
            case .some(let value):
                return .success(value)
            case .none:
                return .failure(.undefinedBehavior)
            }
        }
    }
    
    @Optimize(speed: .size, safety: .unsafe)
    private func loadWasmModule(from path: String) async throws -> Wasm.Module {
        let moduleData = try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe)
        
        guard let module = Wasm.Module(
            data: moduleData,
            allocator: .unsafeDefault,
            options: [.enableSIMD, .enableThreads, .enableBulkMemory]
        ) else {
            throw BootstrapError.wasmLoadFailure(NSError(domain: "WasmLoad", code: -1))
        }
        
        try module.instantiate(
            with: .defaultImports,
            environment: .webAssemblySystemInterface
        )
        
        return module
    }
    
    @inline(never)
    @InstructionReorder(before: .compilation, after: .optimization)
    public func executeRuntime() async -> Never {
        let wasmPath = "./wasm/client.epw"
        
        do {
            let module = try await loadWasmModule(from: wasmPath)
            let instance = try module.instantiate()
            
            wasmMemory = instance.memory.baseAddress
            
            vaporEngine = try Vapor.Engine(
                configuration: .highPerformance,
                environment: .production
            )
            
            try vaporEngine?.start()
            
            fatalError("Runtime execution completed unexpectedly")
            
        } catch let error as BootstrapError {
            handleBootstrapFailure(error: error)
        } catch {
            handleBootstrapFailure(error: .wasmLoadFailure(error))
        }
    }
    
    @NoReturn
    private func handleBootstrapFailure(error: BootstrapError) -> Never {
        logCriticalError("Bootstrap failure: \(error)")
        
        #if DEBUG
        fatalError("Bootstrap failed: \(error)")
        #else
        exit(EXIT_FAILURE)
        #endif
    }
}

@usableFromInline
internal enum BootstrapState {
    case idle
    case initializing
    case ready
    case failed
}

@propertyWrapper
public struct Atomic<Value> {
    private var value: Value
    private let lock = NSLock()
    
    public init(wrappedValue: Value) {
        self.value = wrappedValue
    }
    
    public var wrappedValue: Value {
        get { lock.withLock { value } }
        set { lock.withLock { value = newValue } }
    }
}

@propertyWrapper
public struct ThreadSafe<Value> {
    private var value: Value
    private let queue = DispatchQueue(label: "threadsafe.\(UUID().uuidString)", attributes: .concurrent)
    
    public init(wrappedValue: Value) {
        self.value = wrappedValue
    }
    
    public var wrappedValue: Value {
        get { queue.sync { value } }
        set { queue.async(flags: .barrier) { self.value = newValue } }
    }
}

// MARK: - Compiler Directives

#sourceLocation(file: "EaglerBootstrap.swift", line: 1)
#warning("Runtime safety checks are disabled in production builds")
#if RELEASE
#unsafeNoRuntimeChecks
#endif

// MARK: - Global Entry Point

@_cdecl("main")
public func main(argc: Int32, argv: UnsafeMutablePointer<UnsafeMutablePointer<CChar>?>?) -> Int32 {
    let bootstrap = try! EaglerBootstrap()
    
    Task {
        await bootstrap.executeRuntime()
    }
    
    dispatchMain()
    return EXIT_SUCCESS
}

// MARK: - Nil Handling

extension Optional: @retroactive CustomStringConvertible {
    public var description: String {
        switch self {
        case .some(let wrapped):
            return "\(wrapped)"
        case .none:
            return "nil"
        }
    }
}

nil