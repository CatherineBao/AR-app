import R, { useState as j, useReducer as lt, useRef as ht, useCallback as N, useEffect as nt } from "react";
import pt from "react-dom/client";
var W = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gt(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function Yt(i) {
  if (i.__esModule)
    return i;
  var t = i.default;
  if (typeof t == "function") {
    var n = function e() {
      return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(i).forEach(function(e) {
    var s = Object.getOwnPropertyDescriptor(i, e);
    Object.defineProperty(n, e, s.get ? s : {
      enumerable: !0,
      get: function() {
        return i[e];
      }
    });
  }), n;
}
const V = (i, t) => {
  const n = 2 * Math.PI * t * i;
  return n / (n + 1);
}, Y = (i, t, n) => i * t + (1 - i) * n;
class Zt {
  constructor({ minCutOff: t, beta: n }) {
    this.minCutOff = t, this.beta = n, this.dCutOff = 1e-3, this.xPrev = null, this.dxPrev = null, this.tPrev = null, this.initialized = !1;
  }
  reset() {
    this.initialized = !1;
  }
  filter(t, n) {
    if (!this.initialized)
      return this.initialized = !0, this.xPrev = n, this.dxPrev = n.map(() => 0), this.tPrev = t, n;
    const { xPrev: e, tPrev: s, dxPrev: r } = this, o = t - s, c = V(o, this.dCutOff), h = [], g = [], m = [];
    for (let p = 0; p < n.length; p++) {
      h[p] = (n[p] - e[p]) / o, g[p] = Y(c, h[p], r[p]);
      const v = this.minCutOff + this.beta * Math.abs(g[p]), T = V(o, v);
      m[p] = Y(T, n[p], e[p]);
    }
    return this.xPrev = m, this.dxPrev = g, this.tPrev = t, m;
  }
}
const ut = `<div class="mindar-ui-overlay mindar-ui-loading">
  <div class="loader"/>
</div>
`, dt = `<div class="mindar-ui-overlay mindar-ui-compatibility">
  <div class="content">
    <h1>Failed to launch :(</h1>
    <p>
      Looks like your device/browser is not compatible.
    </p>

    <br/>
    <br/>
    <p>
      Please try the following recommended browsers:
    </p>
    <p>
      For Android device - Chrome
    </p>
    <p>
      For iOS device - Safari
    </p>
  </div>
</div>
`, ft = `<div class="mindar-ui-overlay mindar-ui-scanning">
  <div class="scanning">
    <div class="inner">
      <div class="scanline"/>
    </div>
  </div>
</div>
`;
function Z(i, t, n, e, s, r, o) {
  try {
    var c = i[r](o), h = c.value;
  } catch (g) {
    n(g);
    return;
  }
  c.done ? t(h) : Promise.resolve(h).then(e, s);
}
function x(i) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(e, s) {
      var r = i.apply(t, n);
      function o(h) {
        Z(r, e, s, o, c, "next", h);
      }
      function c(h) {
        Z(r, e, s, o, c, "throw", h);
      }
      o(void 0);
    });
  };
}
var mt = "Expected a function", tt = NaN, bt = "[object Symbol]", yt = /^\s+|\s+$/g, wt = /^[-+]0x[0-9a-f]+$/i, vt = /^0b[01]+$/i, Tt = /^0o[0-7]+$/i, St = parseInt, Rt = typeof W == "object" && W && W.Object === Object && W, xt = typeof self == "object" && self && self.Object === Object && self, Ct = Rt || xt || Function("return this")(), Mt = Object.prototype, Lt = Mt.toString, Et = Math.max, Pt = Math.min, J = function() {
  return Ct.Date.now();
};
function Ot(i, t, n) {
  var e, s, r, o, c, h, g = 0, m = !1, p = !1, v = !0;
  if (typeof i != "function")
    throw new TypeError(mt);
  t = it(t) || 0, Q(n) && (m = !!n.leading, p = "maxWait" in n, r = p ? Et(it(n.maxWait) || 0, t) : r, v = "trailing" in n ? !!n.trailing : v);
  function T(a) {
    var b = e, l = s;
    return e = s = void 0, g = a, o = i.apply(l, b), o;
  }
  function q(a) {
    return g = a, c = setTimeout(d, t), m ? T(a) : o;
  }
  function _(a) {
    var b = a - h, l = a - g, u = t - b;
    return p ? Pt(u, r - l) : u;
  }
  function P(a) {
    var b = a - h, l = a - g;
    return h === void 0 || b >= t || b < 0 || p && l >= r;
  }
  function d() {
    var a = J();
    if (P(a))
      return D(a);
    c = setTimeout(d, _(a));
  }
  function D(a) {
    return c = void 0, v && e ? T(a) : (e = s = void 0, o);
  }
  function G() {
    c !== void 0 && clearTimeout(c), g = 0, e = h = s = c = void 0;
  }
  function F() {
    return c === void 0 ? o : D(J());
  }
  function C() {
    var a = J(), b = P(a);
    if (e = arguments, s = this, h = a, b) {
      if (c === void 0)
        return q(h);
      if (p)
        return c = setTimeout(d, t), T(h);
    }
    return c === void 0 && (c = setTimeout(d, t)), o;
  }
  return C.cancel = G, C.flush = F, C;
}
function Q(i) {
  var t = typeof i;
  return !!i && (t == "object" || t == "function");
}
function At(i) {
  return !!i && typeof i == "object";
}
function kt(i) {
  return typeof i == "symbol" || At(i) && Lt.call(i) == bt;
}
function it(i) {
  if (typeof i == "number")
    return i;
  if (kt(i))
    return tt;
  if (Q(i)) {
    var t = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = Q(t) ? t + "" : t;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace(yt, "");
  var n = vt.test(i);
  return n || Tt.test(i) ? St(i.slice(2), n ? 2 : 8) : wt.test(i) ? tt : +i;
}
var jt = Ot;
const _t = /* @__PURE__ */ gt(jt), L = typeof window < "u" && (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition), Dt = (i) => i === L;
var $ = () => /(android)/i.test(typeof navigator < "u" ? navigator.userAgent : "");
const U = (...i) => i.map((t) => t.trim()).join(" ").trim(), Ft = /\s*\((.*?)\)\s*/g, Bt = /(\(\?:[^)]+\))\?/g, It = /(\(\?)?:\w+/g, zt = /\*/g, Nt = /[-{}[\]+?.,\\^$|#]/g, Wt = (i) => i instanceof RegExp ? new RegExp(i.source, "i") : (i = i.replace(Nt, "\\$&").replace(Ft, "(?:$1)?").replace(It, (t, n) => n ? t : "([^\\s]+)").replace(zt, "(.*?)").replace(Bt, "\\s*$1?\\s*"), new RegExp("^" + i + "$", "i")), Ht = (i, t) => {
  if (i = i.replace(/\s+/g, "").toLowerCase(), t = t.replace(/\s+/g, "").toLowerCase(), !i.length && !t.length)
    return 1;
  if (!i.length || !t.length)
    return 0;
  if (i === t)
    return 1;
  if (i.length === 1 && t.length === 1 || i.length < 2 || t.length < 2)
    return 0;
  const n = /* @__PURE__ */ new Map();
  for (let s = 0; s < i.length - 1; s++) {
    const r = i.substring(s, s + 2), o = n.has(r) ? n.get(r) + 1 : 1;
    n.set(r, o);
  }
  let e = 0;
  for (let s = 0; s < t.length - 1; s++) {
    const r = t.substring(s, s + 2), o = n.has(r) ? n.get(r) : 0;
    o > 0 && (n.set(r, o - 1), e++);
  }
  return 2 * e / (i.length + t.length - 2);
}, et = () => typeof window < "u" && window.navigator !== void 0 && window.navigator.mediaDevices !== void 0 && window.navigator.mediaDevices.getUserMedia !== void 0 && (window.AudioContext !== void 0 || window.webkitAudioContext !== void 0);
class K {
  setSpeechRecognition(t) {
    const n = !!t && (Dt(t) || et());
    n && (this.disableRecognition(), this.recognition = new t(), this.recognition.continuous = !1, this.recognition.interimResults = !0, this.recognition.onresult = this.updateTranscript.bind(this), this.recognition.onend = this.onRecognitionDisconnect.bind(this), this.recognition.onerror = this.onError.bind(this)), this.emitBrowserSupportsSpeechRecognitionChange(n);
  }
  subscribe(t, n) {
    this.subscribers[t] = n;
  }
  unsubscribe(t) {
    delete this.subscribers[t];
  }
  emitListeningChange(t) {
    this.listening = t, Object.keys(this.subscribers).forEach((n) => {
      const { onListeningChange: e } = this.subscribers[n];
      e(t);
    });
  }
  emitMicrophoneAvailabilityChange(t) {
    this.isMicrophoneAvailable = t, Object.keys(this.subscribers).forEach((n) => {
      const { onMicrophoneAvailabilityChange: e } = this.subscribers[n];
      e(t);
    });
  }
  emitTranscriptChange(t, n) {
    Object.keys(this.subscribers).forEach((e) => {
      const { onTranscriptChange: s } = this.subscribers[e];
      s(t, n);
    });
  }
  emitClearTranscript() {
    Object.keys(this.subscribers).forEach((t) => {
      const { onClearTranscript: n } = this.subscribers[t];
      n();
    });
  }
  emitBrowserSupportsSpeechRecognitionChange(t) {
    Object.keys(this.subscribers).forEach((n) => {
      const { onBrowserSupportsSpeechRecognitionChange: e, onBrowserSupportsContinuousListeningChange: s } = this.subscribers[n];
      e(t), s(t);
    });
  }
  disconnect(t) {
    if (this.recognition && this.listening)
      switch (t) {
        case "ABORT":
          this.pauseAfterDisconnect = !0, this.abort();
          break;
        case "RESET":
          this.pauseAfterDisconnect = !1, this.abort();
          break;
        case "STOP":
        default:
          this.pauseAfterDisconnect = !0, this.stop();
      }
  }
  disableRecognition() {
    this.recognition && (this.recognition.onresult = () => {
    }, this.recognition.onend = () => {
    }, this.recognition.onerror = () => {
    }, this.listening && this.stopListening());
  }
  onError(t) {
    t && t.error && t.error === "not-allowed" && (this.emitMicrophoneAvailabilityChange(!1), this.disableRecognition());
  }
  onRecognitionDisconnect() {
    this.onStopListening(), this.listening = !1, this.pauseAfterDisconnect ? this.emitListeningChange(!1) : this.recognition && (this.recognition.continuous ? this.startListening({
      continuous: this.recognition.continuous
    }) : this.emitListeningChange(!1)), this.pauseAfterDisconnect = !1;
  }
  updateTranscript({ results: t, resultIndex: n }) {
    const e = n === void 0 ? t.length - 1 : n;
    this.interimTranscript = "", this.finalTranscript = "";
    for (let r = e; r < t.length; ++r)
      t[r].isFinal && (!$() || t[r][0].confidence > 0) ? this.updateFinalTranscript(t[r][0].transcript) : this.interimTranscript = U(this.interimTranscript, t[r][0].transcript);
    let s = !1;
    this.interimTranscript === "" && this.finalTranscript !== "" ? (this.previousResultWasFinalOnly && (s = !0), this.previousResultWasFinalOnly = !0) : this.previousResultWasFinalOnly = !1, s || this.emitTranscriptChange(this.interimTranscript, this.finalTranscript);
  }
  updateFinalTranscript(t) {
    this.finalTranscript = U(this.finalTranscript, t);
  }
  resetTranscript() {
    this.disconnect("RESET");
  }
  startListening() {
    return /* @__PURE__ */ x(function* ({ continuous: t = !1, language: n } = {}) {
      if (!this.recognition)
        return;
      const e = t !== this.recognition.continuous, s = n && n !== this.recognition.lang;
      if ((e || s) && (this.listening && (yield this.stopListening()), this.recognition.continuous = e ? t : this.recognition.continuous, this.recognition.lang = s ? n : this.recognition.lang), !this.listening) {
        this.recognition.continuous || (this.resetTranscript(), this.emitClearTranscript());
        try {
          yield this.start(), this.emitListeningChange(!0);
        } catch (r) {
          r instanceof DOMException || this.emitMicrophoneAvailabilityChange(!1);
        }
      }
    }).apply(this, arguments);
  }
  abortListening() {
    return /* @__PURE__ */ x(function* () {
      this.disconnect("ABORT"), this.emitListeningChange(!1), yield new Promise((t) => {
        this.onStopListening = t;
      });
    }).call(this);
  }
  stopListening() {
    return /* @__PURE__ */ x(function* () {
      this.disconnect("STOP"), this.emitListeningChange(!1), yield new Promise((t) => {
        this.onStopListening = t;
      });
    }).call(this);
  }
  getRecognition() {
    return this.recognition;
  }
  start() {
    return /* @__PURE__ */ x(function* () {
      this.recognition && !this.listening && (yield this.recognition.start(), this.listening = !0);
    }).call(this);
  }
  stop() {
    this.recognition && this.listening && (this.recognition.stop(), this.listening = !1);
  }
  abort() {
    this.recognition && this.listening && (this.recognition.abort(), this.listening = !1);
  }
  constructor(t) {
    this.recognition = null, this.pauseAfterDisconnect = !1, this.interimTranscript = "", this.finalTranscript = "", this.listening = !1, this.isMicrophoneAvailable = !0, this.subscribers = {}, this.onStopListening = () => {
    }, this.previousResultWasFinalOnly = !1, this.resetTranscript = this.resetTranscript.bind(this), this.startListening = this.startListening.bind(this), this.stopListening = this.stopListening.bind(this), this.abortListening = this.abortListening.bind(this), this.setSpeechRecognition = this.setSpeechRecognition.bind(this), this.disableRecognition = this.disableRecognition.bind(this), this.setSpeechRecognition(t), $() && (this.updateFinalTranscript = _t(this.updateFinalTranscript, 250, {
      leading: !0
    }));
  }
}
const st = "CLEAR_TRANSCRIPT", rt = "APPEND_TRANSCRIPT", $t = () => ({
  type: st
}), Ut = (i, t) => ({
  type: rt,
  payload: {
    interimTranscript: i,
    finalTranscript: t
  }
}), qt = (i, t) => {
  switch (t.type) {
    case st:
      return {
        interimTranscript: "",
        finalTranscript: ""
      };
    case rt:
      return {
        interimTranscript: t.payload.interimTranscript,
        finalTranscript: U(i.finalTranscript, t.payload.finalTranscript)
      };
    default:
      throw new Error();
  }
};
let E = !!L, H = E && !$(), y;
const Gt = ({ transcribing: i = !0, clearTranscriptOnListen: t = !0, commands: n = [] } = {}) => {
  const [e] = j(w.getRecognitionManager()), [s, r] = j(E), [o, c] = j(H), [{ interimTranscript: h, finalTranscript: g }, m] = lt(qt, {
    interimTranscript: e.interimTranscript,
    finalTranscript: ""
  }), [p, v] = j(e.listening), [T, q] = j(e.isMicrophoneAvailable), _ = ht(n);
  _.current = n;
  const P = () => {
    m($t());
  }, d = N(() => {
    e.resetTranscript(), P();
  }, [
    e
  ]), D = (l, u, M) => {
    const B = (typeof l == "object" ? l.toString() : l).replace(/[&/\\#,+()!$~%.'":*?<>{}]/g, "").replace(/  +/g, " ").trim(), O = Ht(B, u);
    return O >= M ? {
      command: l,
      commandWithoutSpecials: B,
      howSimilar: O,
      isFuzzyMatch: !0
    } : null;
  }, G = (l, u) => {
    const S = Wt(l).exec(u);
    return S ? {
      command: l,
      parameters: S.slice(1)
    } : null;
  }, F = N((l, u) => {
    _.current.forEach(({ command: M, callback: S, matchInterim: B = !1, isFuzzyMatch: O = !1, fuzzyMatchingThreshold: ot = 0.8, bestMatchOnly: at = !1 }) => {
      const I = !u && B ? l.trim() : u.trim(), z = (Array.isArray(M) ? M : [
        M
      ]).map((f) => O ? D(f, I, ot) : G(f, I)).filter((f) => f);
      if (O && at && z.length >= 2) {
        z.sort((X, ct) => ct.howSimilar - X.howSimilar);
        const { command: f, commandWithoutSpecials: A, howSimilar: k } = z[0];
        S(A, I, k, {
          command: f,
          resetTranscript: d
        });
      } else
        z.forEach((f) => {
          if (f.isFuzzyMatch) {
            const { command: A, commandWithoutSpecials: k, howSimilar: X } = f;
            S(k, I, X, {
              command: A,
              resetTranscript: d
            });
          } else {
            const { command: A, parameters: k } = f;
            S(...k, {
              command: A,
              resetTranscript: d
            });
          }
        });
    });
  }, [
    d
  ]), C = N((l, u) => {
    i && m(Ut(l, u)), F(l, u);
  }, [
    F,
    i
  ]), a = N(() => {
    t && P();
  }, [
    t
  ]);
  return nt(() => {
    const l = w.counter;
    w.counter += 1;
    const u = {
      onListeningChange: v,
      onMicrophoneAvailabilityChange: q,
      onTranscriptChange: C,
      onClearTranscript: a,
      onBrowserSupportsSpeechRecognitionChange: r,
      onBrowserSupportsContinuousListeningChange: c
    };
    return e.subscribe(l, u), () => {
      e.unsubscribe(l);
    };
  }, [
    i,
    t,
    e,
    C,
    a
  ]), {
    transcript: U(g, h),
    interimTranscript: h,
    finalTranscript: g,
    listening: p,
    isMicrophoneAvailable: T,
    resetTranscript: d,
    browserSupportsSpeechRecognition: s,
    browserSupportsContinuousListening: o
  };
}, w = {
  counter: 0,
  applyPolyfill: (i) => {
    y ? y.setSpeechRecognition(i) : y = new K(i);
    const t = !!i && et();
    E = t, H = t;
  },
  removePolyfill: () => {
    y ? y.setSpeechRecognition(L) : y = new K(L), E = !!L, H = E && !$();
  },
  getRecognitionManager: () => (y || (y = new K(L)), y),
  getRecognition: () => w.getRecognitionManager().getRecognition(),
  startListening: ({ continuous: i, language: t } = {}) => /* @__PURE__ */ x(function* () {
    yield w.getRecognitionManager().startListening({
      continuous: i,
      language: t
    });
  })(),
  stopListening: () => /* @__PURE__ */ x(function* () {
    yield w.getRecognitionManager().stopListening();
  })(),
  abortListening: () => /* @__PURE__ */ x(function* () {
    yield w.getRecognitionManager().abortListening();
  })(),
  browserSupportsSpeechRecognition: () => E,
  browserSupportsContinuousListening: () => H
}, Xt = () => {
  const {
    transcript: i,
    listening: t,
    browserSupportsSpeechRecognition: n
  } = Gt();
  return nt(() => {
    n && (async () => {
      try {
        await w.startListening({ continuous: !0 });
      } catch (s) {
        console.error("Error starting speech recognition:", s);
      }
    })();
  }, [n]), n ? /* @__PURE__ */ R.createElement("div", { style: {
    width: "100%",
    maxWidth: "100%",
    color: "white",
    padding: "12px 16px",
    textAlign: "center",
    fontSize: "14px",
    minHeight: "24px"
  } }, t ? /* @__PURE__ */ R.createElement("div", null, i ? /* @__PURE__ */ R.createElement("div", { style: { wordWrap: "break-word", whiteSpace: "normal" } }, i) : /* @__PURE__ */ R.createElement("div", { style: { opacity: 0.7, fontStyle: "italic" } }, "Listening... Say something")) : /* @__PURE__ */ R.createElement("div", { style: { opacity: 0.7, fontStyle: "italic" } }, "Requesting microphone permission...")) : /* @__PURE__ */ R.createElement("div", { style: {
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    fontSize: "14px"
  } }, "Browser doesn't support speech recognition.");
}, Jt = ".mindar-ui-overlay{display:flex;align-items:center;justify-content:center;position:absolute;left:0;right:0;top:0;bottom:0;background:transparent;z-index:2}.mindar-ui-overlay.hidden{display:none}.mindar-ui-loading .loader{border:16px solid #222;border-top:16px solid white;opacity:.8;border-radius:50%;width:120px;height:120px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.mindar-ui-compatibility .content{background:black;color:#fff;opacity:.8;text-align:center;margin:20px;padding:20px;min-height:50vh}@media (min-aspect-ratio: 1/1){.mindar-ui-scanning .scanning{width:50vh;height:50vh}}@media (max-aspect-ratio: 1/1){.mindar-ui-scanning .scanning{width:80vw;height:80vw}}.mindar-ui-scanning .scanning .inner{position:relative;width:100%;height:100%;opacity:.8;background:linear-gradient(to right,white 10px,transparent 10px) 0 0,linear-gradient(to right,white 10px,transparent 10px) 0 100%,linear-gradient(to left,white 10px,transparent 10px) 100% 0,linear-gradient(to left,white 10px,transparent 10px) 100% 100%,linear-gradient(to bottom,white 10px,transparent 10px) 0 0,linear-gradient(to bottom,white 10px,transparent 10px) 100% 0,linear-gradient(to top,white 10px,transparent 10px) 0 100%,linear-gradient(to top,white 10px,transparent 10px) 100% 100%;background-repeat:no-repeat;background-size:40px 40px}.mindar-ui-scanning .scanning .inner .scanline{position:absolute;width:100%;height:10px;background:white;animation:move 2s linear infinite}@keyframes move{0%,to{top:0%}50%{top:calc(100% - 10px)}}";
class ti {
  constructor({ uiLoading: t, uiScanning: n, uiError: e }) {
    const s = document.createElement("style");
    s.innerText = Jt, document.head.appendChild(s), t === "yes" ? this.loadingModal = this._loadHTML(ut) : t !== "no" && (this.loadingModal = document.querySelector(t)), e === "yes" ? this.compatibilityModal = this._loadHTML(dt) : e !== "no" && (this.compatibilityModal = document.querySelector(e)), n === "yes" ? this.scanningMask = this._loadHTML(ft) : n !== "no" && (this.scanningMask = document.querySelector(n)), this.hideLoading(), this.hideCompatibility(), this.hideScanning(), this.addDictaphone();
  }
  showLoading() {
    this.loadingModal && this.loadingModal.classList.remove("hidden");
  }
  hideLoading() {
    this.loadingModal && this.loadingModal.classList.add("hidden");
  }
  showCompatibility() {
    this.compatibilityModal && this.compatibilityModal.classList.remove("hidden");
  }
  hideCompatibility() {
    this.compatibilityModal && this.compatibilityModal.classList.add("hidden");
  }
  showScanning() {
    this.scanningMask && this.scanningMask.classList.remove("hidden");
  }
  hideScanning() {
    this.scanningMask && this.scanningMask.classList.add("hidden");
  }
  _loadHTML(t) {
    const n = document.createElement("template");
    n.innerHTML = t.trim();
    const e = n.content.firstChild;
    return document.getElementsByTagName("body")[0].appendChild(e), e;
  }
  addDictaphone() {
    const t = document.createElement("div");
    t.id = "dictaphone-container", t.style.position = "fixed", t.style.bottom = "0", t.style.left = "0", t.style.width = "100%", t.style.display = "flex", t.style.justifyContent = "center", t.style.padding = "12px", t.style.zIndex = "9999", t.style.background = "rgba(0, 0, 0, 0.35)", t.style.backdropFilter = "blur(4px)";
    const n = document.createElement("div");
    n.id = "dictaphone-root", t.appendChild(n), document.body.appendChild(t), pt.createRoot(n).render(R.createElement(Xt));
  }
}
export {
  Zt as O,
  ti as U,
  Yt as a,
  W as c,
  gt as g
};
