"use strict";
(window.eaglercraftXClientScriptElement = document.currentScript),
(function() {
    const _0x3c7e92 = (function(e, t) {
        for (let n = 0; n < e.length; n++) t[e.charCodeAt(n)] = n;
        return t
    })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", new Array(123).fill(-1));

    function _0x2c9a7c(e) {
        console.log(`LoaderBootstrap: [INFO] ${e}`)
    }

    function _0x1a4d5a(e) {
        console.log(`LoaderBootstrap: [WARN] ${e}`)
    }

    function _0x4e3b1d(e) {
        console.error(`LoaderBootstrap: [ERROR] ${e}`)
    }
    let _0x5a1c2d = null;

    async function _0x3f7a6c() {
        return new Promise(e => setTimeout(e, 20))
    }

    async function _0x2f1b8a(e) {
        try {
            const t = await fetch(e, {
                cache: "force-cache"
            });
            return await t.arrayBuffer()
        } catch (e) {
            return _0x4e3b1d(`Failed to fetch URL! ${e}`), null
        }
    }

    async function _0x5d3c8a(e) {
        if (e.startsWith("data:application/octet-stream;base64,")) {
            const t = await _0x2f1b8a(e);
            if (t) return t;
            _0x1a4d5a("Failed to decode base64 via fetch, doing it the slow way instead...");
            try {
                _0x5a1c2d ||= function() {
                    const e = [];
                    for (let t = 0; t < 64; t++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)] = t;
                    return e[45] = 62, e[95] = 63,
                        function(t, n) {
                            let a = t.length - n;
                            if (a % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                            const i = t.indexOf("=", n),
                                o = i === -1 ? a : i - n,
                                r = i === a ? 0 : 4 - i % 4,
                                s = new Uint8Array(3 * (o + r) / 4 - r);
                            let c = 0;
                            const l = (r > 0 ? o - 4 : o) + n;
                            let d = n;
                            for (; d < l; d += 4) {
                                let n = e[t.charCodeAt(d)] << 18 | e[t.charCodeAt(d + 1)] << 12 | e[t.charCodeAt(d + 2)] << 6 | e[t.charCodeAt(d + 3)];
                                s[c++] = n >> 16 & 255, s[c++] = n >> 8 & 255, s[c++] = 255 & n
                            }
                            return 2 === r ? (n = e[t.charCodeAt(d)] << 2 | e[t.charCodeAt(d + 1)] >> 4, s[c++] = 255 & n) : 1 === r && (n = e[t.charCodeAt(d)] << 10 | e[t.charCodeAt(d + 1)] << 4 | e[t.charCodeAt(d + 2)] >> 2, s[c++] = n >> 8 & 255, s[c++] = 255 & n), s.buffer
                        }
                }();
                const n = _0x5a1c2d(e, 37);
                return n
            } catch (e) {
                return _0x4e3b1d(`Failed to decode base64! ${e}`), null
            }
        } else {
            return await _0x2f1b8a(e)
        }
    }

    function _0x4a2f8c(e, t) {
        const n = document.createElement("h2");
        n.style.color = "#AA0000", n.style.padding = "25px", n.style.fontFamily = "sans-serif", n.style.marginBlock = "0px", n.appendChild(document.createTextNode(t)), e.appendChild(n);
        const a = document.createElement("h4");
        a.style.color = "#AA0000", a.style.padding = "25px", a.style.fontFamily = "sans-serif", a.style.marginBlock = "0px", a.appendChild(document.createTextNode("Try again later")), e.style.backgroundColor = "white", e.appendChild(a)
    }

    window.main = async function() {
        if (void 0 === window.eaglercraftXOpts) return _0x4e3b1d("window.eaglercraftXOpts is not defined!"), void alert("window.eaglercraftXOpts is not defined!");
        let e = window.eaglercraftXOpts.container;
        if ("string" != typeof e) return _0x4e3b1d("window.eaglercraftXOpts.container is not a string!"), void alert("window.eaglercraftXOpts.container is not a string!");
        let t = window.eaglercraftXOpts.assetsURI;
        if ("string" != typeof t) {
            if ("object" != typeof t || "object" != typeof t[0] || "string" != typeof t[0].url) return _0x4e3b1d("window.eaglercraftXOpts.assetsURI is not a string!"), void alert("window.eaglercraftXOpts.assetsURI is not a string!");
            t = t[0].url
        }
        t.startsWith("data:") && delete window.eaglercraftXOpts.assetsURI;
        let n = document.getElementById(e);
        if (!n) return _0x4e3b1d(`window.eaglercraftXOpts.container "${e}" is not a known element id!`), void alert(`window.eaglercraftXOpts.container "${e}" is not a known element id!`);
        while (n.lastChild) n.removeChild(n.lastChild);
        const a = document.createElement("div");
        a.style.width = "100%", a.style.height = "100%", a.style.setProperty("image-rendering", "pixelated"), a.style.background = 'center / contain no-repeat url("data:image/png;base64,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") white';
        n.appendChild(a);
        await _0x3f7a6c();
        let i;
        t.startsWith("data:") ? (_0x2c9a7c(`Downloading EPW file "<data: ${t.length} chars>"...`), i = await _0x5d3c8a(t)) : (_0x2c9a7c(`Downloading EPW file "${t}"...`), i = await _0x2f1b8a(t));
        let o = !1;
        if (!i) o = !0;
        else if (i.byteLength < 384) _0x1a4d5a("The EPW file is too short"), o = !0;
        if (o) return n.removeChild(a), void _0x4a2f8c(n, "Failed to download EPW file!");
        const r = new DataView(i);
        if (r.getUint32(0, !0) !== 608649541 || r.getUint32(4, !0) !== 1297301847) return _0x4e3b1d("The file is not an EPW file"), n.removeChild(a), void _0x4a2f8c(n, "EPW file is invalid!");
        if (r.getUint32(8, !0) !== i.byteLength) return _0x4e3b1d("The EPW file is the wrong length"), n.removeChild(a), void _0x4a2f8c(n, "EPW file is invalid!");
        const s = new TextDecoder("utf-8");
        let c = r.getUint32(100, !0),
            l = r.getUint32(104, !0),
            d = r.getUint32(108, !0),
            u = r.getUint32(112, !0);
        if (c < 0 || c + l > i.byteLength || d < 0 || d + u > i.byteLength) return _0x4e3b1d("The EPW file contains an invalid offset (component: splash)"), n.removeChild(a), void _0x4a2f8c(n, "EPW file is invalid!");
        const h = new Uint8Array(i, c, l),
            p = new Uint8Array(i, d, u),
            f = URL.createObjectURL(new Blob([h], {
                type: s.decode(p)
            }));
        await function(e) {
            return new Promise(t => {
                const n = new Image;
                n.addEventListener("load", t), n.addEventListener("error", () => {
                    _0x1a4d5a(`Failed to preload image: ${e}`), t()
                }), n.src = e, setTimeout(t, 50)
            })
        }(f), _0x2c9a7c(`Loaded splash img: ${f}`), a.style.background = `center / contain no-repeat url("${f}"), 0px 0px / 1000000% 1000000% no-repeat url("${f}") white`;
        await _0x3f7a6c();
        let m = r.getUint32(164, !0),
            g = r.getUint32(168, !0),
            v = r.getUint32(180, !0),
            y = r.getUint32(184, !0);
        if (m < 0 || m + g > i.byteLength || v < 0 || v + y > i.byteLength) return _0x4e3b1d("The EPW file contains an invalid offset (component: loader)"), n.removeChild(a), void _0x4a2f8c(n, "EPW file is invalid!");
        const b = new Uint8Array(i, m, g),
            w = URL.createObjectURL(new Blob([b], {
                type: "text/javascript;charset=utf-8"
            }));
        _0x2c9a7c(`Loaded loader.js: ${f}`);
        const E = new Uint8Array(i, v, y),
            L = URL.createObjectURL(new Blob([E], {
                type: "application/wasm"
            }));
        _0x2c9a7c(`Loaded loader.wasm: ${L}`);
        const O = {};
        for (const [e, t] of Object.entries(window.eaglercraftXOpts)) "container" !== e && "assetsURI" !== e && (O[e] = t);
        window.__eaglercraftXLoaderContextPre = {
            rootElement: n,
            eaglercraftXOpts: O,
            theEPWFileBuffer: i,
            loaderWASMURL: L,
            splashURL: f
        }, _0x2c9a7c("Appending loader.js to document...");
        const S = document.createElement("script");
        S.type = "text/javascript", S.src = w, document.head.appendChild(S)
    }
}());