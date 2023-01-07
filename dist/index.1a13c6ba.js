// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1c3nq":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "c069c2fe1a13c6ba";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8kjkw":[function(require,module,exports) {
var _routesJs = require("./routes.js");
function resolveRoute(route) {
    if (_routesJs[route]) return _routesJs[route];
    else return _routesJs["no_page"];
}
function router(evt) {
    let url = window.location.hash.slice(1) || "home";
    console.log(url);
    let route = resolveRoute(url);
    route();
}
window.addEventListener("load", router);
window.addEventListener("hashchange", router);

},{"./routes.js":"dJaJI"}],"dJaJI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/*
function about() {
	let link = document.createElement('a');
	link.href = '#/';
	link.innerText = 'Home';

	let div = document.createElement('div');
	div.innerHTML = '<h1>About</h1>';
	div.appendChild(link);

	main.appendChild(div);
};
*/ parcelHelpers.export(exports, "home", ()=>home);
parcelHelpers.export(exports, "no_page", ()=>no_page);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "signup", ()=>signup);
parcelHelpers.export(exports, "chat", ()=>chat);
parcelHelpers.export(exports, "chatlist", ()=>chatlist);
var _templateJs = require("./template.js");
var _templateJsDefault = parcelHelpers.interopDefault(_templateJs);
let main = document.getElementById("main");
function makePage(name, props) {
    if (name == undefined) name = "no_page";
    main.innerHTML = `<div id="${name}"></div>`;
    (0, _templateJsDefault.default)(name, props);
}
function no_page() {
    makePage();
}
function home() {
    makePage("home", {
        "buttons": [
            {
                "name": "Log in",
                "onclick": "location.href='#login';"
            },
            {
                "name": "Sign up",
                "onclick": "location.href='#signup';"
            },
            {
                "name": "Chat",
                "onclick": "location.href='#chat';"
            },
            // {'name':'Chat list',	'onclick':"location.href='#chatlist';"},
            {
                "name": "404",
                "onclick": "location.href='#404';"
            }
        ]
    });
}
function login() {
    makePage("login");
}
function signup() {
    makePage("signup");
}
function chat() {
    makePage("chat");
}
function chatlist() {
    makePage("chatlist");
}

},{"./template.js":"aZDaH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aZDaH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tmpl = require("bundle-text:../pages/*.tmpl");
var _buttonJs = require("../components/button/button.js");
var _buttonJsDefault = parcelHelpers.interopDefault(_buttonJs);
var _closeJs = require("../components/close/close.js");
var _closeJsDefault = parcelHelpers.interopDefault(_closeJs);
var _moreJs = require("../components/more/more.js");
var _moreJsDefault = parcelHelpers.interopDefault(_moreJs);
var _attachJs = require("../components/attach/attach.js");
var _attachJsDefault = parcelHelpers.interopDefault(_attachJs);
function tmpl(name = "home", options = {}) {
    let rendered = _tmpl[name].toString().replace("{{close}}", (0, _closeJsDefault.default)()).replace("{{more}}", (0, _moreJsDefault.default)()).replace("{{attachment}}", (0, _attachJsDefault.default)());
    if (options.buttons) rendered = rendered.replace("{{buttons}}", (0, _buttonJsDefault.default)(options.buttons));
    let include = rendered.match(/{{(.*)}}/g);
    if (include) {
        console.log(include);
        include.forEach((name)=>{
            rendered = rendered.replace(name, tmpl(name.slice(2, name.length - 2)));
        });
    }
    return rendered;
}
function addTemplate(name = "home", options = {}) {
    let element = document.getElementById(name);
    // console.log(element);
    element.innerHTML = tmpl(name, options);
    return element;
}
exports.default = addTemplate;

},{"bundle-text:../pages/*.tmpl":"jwk8b","../components/button/button.js":"15n4s","../components/close/close.js":"1DMJH","../components/more/more.js":"6SRNy","../components/attach/attach.js":"6wr2T","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jwk8b":[function(require,module,exports) {
const _temp0 = require("6e45b8df140d56b4");
const _temp1 = require("8da40e181352c691");
const _temp2 = require("57caac26ee6a73fa");
const _temp3 = require("663e5021a0d668cb");
const _temp4 = require("cff088d0779dd7b7");
const _temp5 = require("3551e69fe3949d8a");
const _temp6 = require("8c6de72d7ad27a94");
const _temp7 = require("961b73ab2f319e36");
const _temp8 = require("97b3c717ab686771");
module.exports = {
    "bottom_frame": _temp0,
    "chat": _temp1,
    "details_frame": _temp2,
    "home": _temp3,
    "login": _temp4,
    "no_page": _temp5,
    "side_frame": _temp6,
    "signup": _temp7,
    "upper_frame": _temp8
};

},{"6e45b8df140d56b4":"gM1L6","8da40e181352c691":"eskuJ","57caac26ee6a73fa":"dU1om","663e5021a0d668cb":"6Dqgo","cff088d0779dd7b7":"3K679","3551e69fe3949d8a":"7ctl2","8c6de72d7ad27a94":"2H40N","961b73ab2f319e36":"eLJj1","97b3c717ab686771":"h2Hin"}],"gM1L6":[function(require,module,exports) {
module.exports = "<div id=\"bottom_frame\">\r\n\t{{attachment}}\r\n\t<div class=\"message_box\">\r\n\t\t<input type=\"text\" class=\"textbox\" placeholder=\"Message text\" name=\"message_text\" required>\r\n\t</div>\r\n\t<div></div>\r\n</div>";

},{}],"eskuJ":[function(require,module,exports) {
module.exports = "{{side_frame}}\r\n<div id=\"central_frame\">\r\n\t{{upper_frame}}\r\n\t<div id=\"messages_frame\"></div>\r\n\t{{bottom_frame}}\r\n</div>\r\n{{details_frame}}";

},{}],"dU1om":[function(require,module,exports) {
module.exports = "";

},{}],"6Dqgo":[function(require,module,exports) {
module.exports = "<h1>Chat</h1>\r\n<div style=\"display: flex;\">\r\n\t<div id=\"people-12\"></div>\r\n\t<nav class=\"selector\">\r\n\t\t{{buttons}}\r\n\t</nav>\r\n</div>";

},{}],"3K679":[function(require,module,exports) {
module.exports = "{{close}}\r\n<h1>Log in</h1>\r\n<div>\r\n\t<div class=\"selector\">\r\n\t\t<form action=\"#\" method=\"post\">\r\n\t\t\t<div class=\"container\">\r\n\t\t\t\t<ul>\r\n\t\t\t\t<li><label for=\"uname\" class=\"desc\">E-mail</label></li>\r\n\t\t\t\t<li><input type=\"text\" class=\"main_inputbox\" placeholder=\"Enter Username\" name=\"uname\" required></li>\r\n\t\t\t\t<br>\r\n\t\t\t\t<li><label for=\"psw\" class=\"desc\">Password</label></li>\r\n\t\t\t\t<li><input type=\"password\" class=\"main_inputbox\" placeholder=\"Enter Password\" name=\"psw\" required></li>\r\n\t\t\t\t<br>\r\n\t\t\t\t<li><label><input type=\"checkbox\" checked=\"checked\" name=\"remember\"> Remember me</label></li>\r\n\t\t\t\t<br>\r\n\t\t\t\t<li><button type=\"submit\" class=\"main_button\">Log in</button></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t\t<a href=\"#signup\" style=\"text-align: center;\">Sign up</a>\r\n\t</div>\r\n</div>";

},{}],"7ctl2":[function(require,module,exports) {
module.exports = "<h1>Page not found (404)</h1>\r\n<div id=\"people-24\"></div>";

},{}],"2H40N":[function(require,module,exports) {
module.exports = "<div id=\"side_frame\">\r\n\t<div id=\"header_frame\">\r\n\t\t{{more}}\r\n\t\t<form action=\"#\" method=\"post\">\r\n\t\t\t<div class=\"search_form\">\r\n\t\t\t<input type=\"text\" class=\"textbox\" placeholder=\"Search text\" name=\"search_text\" required>\r\n\t\t\t<button type=\"submit\" class=\"search_button\">&nbsp;</button>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n\t<div id=\"chat_list\"></div>\r\n</div>";

},{}],"eLJj1":[function(require,module,exports) {
module.exports = "{{close}}\r\n<h1>Sign up</h1>\r\n<div>\r\n\t<div class=\"selector\">\r\n\t\t<form action=\"#\" method=\"post\">\r\n\t\t\t<div class=\"container\">\r\n\t\t\t\t<ul>\r\n\t\t\t\t<li><label for=\"uname\" class=\"desc\">E-mail</label></li>\r\n\t\t\t\t<li><input type=\"text\" class=\"main_inputbox\" placeholder=\"\" name=\"uname\" required></li>\r\n\t\t\t\t<li><label for=\"uname\" class=\"err\">Error</label></li>\r\n\r\n\t\t\t\t<li><label for=\"psw\" class=\"desc\">Password</label></li>\r\n\t\t\t\t<li><input type=\"password\" class=\"main_inputbox\" name=\"psw\" required></li>\r\n\t\t\t\t<li><label for=\"psw\" class=\"err\">Error</label></li>\r\n\r\n\t\t\t\t<li><label for=\"psw-repeat\" class=\"desc\">Repeat password</label></li>\r\n\t\t\t\t<li><input type=\"password\" class=\"main_inputbox\" name=\"psw-repeat\" required></li>\r\n\t\t\t\t<li><label for=\"psw-repeat\" class=\"err\">Error</label></li>\r\n\r\n\t\t\t\t<li><label><input type=\"checkbox\" checked=\"checked\" name=\"remember\"> Remember me</label></li>\r\n\t\t\t\t<br>\r\n\t\t\t\t<li><button type=\"submit\" class=\"main_button\">Sign up</button></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t\t<a href=\"#login\" style=\"text-align: center;\">Log in</a>\r\n\t</div>\r\n</div>";

},{}],"h2Hin":[function(require,module,exports) {
module.exports = "<div id=\"upper_frame\">\r\n\t<div class=\"icon\"></div>\r\n\t<div class=\"name\">Chat name</div>\r\n\t{{more}}\r\n</div>";

},{}],"15n4s":[function(require,module,exports) {
// import classes from './style.css';
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function MainButton({ name , onclick  }) {
    // console.log(classes);
    return `<button class="main_button" onclick="${onclick}">${name}</button>`;
}
function AddButtons(data) {
    let out = "";
    data.forEach((element)=>{
        out += MainButton(element) + "\n";
    });
    // console.log(out);
    return out;
}
exports.default = AddButtons;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1DMJH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function CloseButton() {
    return `<button class="close_button" onclick="location.href='#'">X</button>`;
}
exports.default = CloseButton;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6SRNy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function MoreButton() {
    return `<div><button class="more_button" onclick="location.href='#'">⁞</button></div>\n`;
}
exports.default = MoreButton;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6wr2T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function AttachButton() {
    return `<button class="attach_button" onclick="location.href='#'"></button>\n`;
}
exports.default = AttachButton;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["1c3nq","8kjkw"], "8kjkw", "parcelRequire40a5")

//# sourceMappingURL=index.1a13c6ba.js.map
