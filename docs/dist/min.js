const w = {
  version: "v9.0",
  description: "build store from data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, L = (e) => {
  var o;
  typeof globalThis > "u" || !e || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom-datalist"] = {
    meta: w,
    DataList: e
  }, (o = globalThis.ks).jsonToDomDatalist ?? (o.jsonToDomDatalist = {
    meta: w,
    DataList: e
  }));
}, C = ({ inData: e = [], inColumns: o = [], inConfig: t = {}, inTopN: n } = {}) => {
  const l = e, a = o, r = t, s = n;
  return {
    originalData: Array.isArray(l) ? typeof structuredClone == "function" ? structuredClone(l) : JSON.parse(JSON.stringify(l)) : [],
    columns: Array.isArray(a) ? a : [],
    config: r || {},
    topN: s
  };
}, E = ({ inColumnsCatalog: e = [], inColumnKeys: o = [] } = {}) => {
  const t = e, n = o;
  if (Array.isArray(n) && n.length > 0) {
    const l = new Map((Array.isArray(t) ? t : []).map((s) => [s.key, s])), a = [], r = [];
    for (const s of n) {
      const i = l.get(s);
      i ? r.push(i) : a.push(s);
    }
    return a.length > 0 && console.warn(
      `[json-to-dom-datalist] Warning: Config requested columns [${a.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), r;
  }
  return Array.isArray(t) ? t : [];
};
class k {
  constructor({ inData: o = [], inColumns: t = [], inConfig: n = {}, inTopN: l } = {}) {
    const a = o, r = t, s = n, i = l;
    this.source = C({
      inData: a,
      inColumns: r,
      inConfig: s,
      inTopN: i
    });
  }
  _buildSource(o) {
    return C(o);
  }
  _resolveActiveColumns(o) {
    return E(o);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const O = ({ inData: e } = {}) => {
  const o = e;
  if (o == null)
    return [];
  if (typeof structuredClone == "function")
    try {
      return structuredClone(o);
    } catch {
    }
  try {
    return JSON.parse(JSON.stringify(o));
  } catch {
    return Array.isArray(o) ? [...o] : { ...o };
  }
}, V = ({
  inData: e = [],
  inActiveColumns: o = []
} = {}) => O({
  inData: e
}).map((l) => {
  let a = {};
  return o.forEach((r) => {
    const s = typeof r == "string" ? r : (r == null ? void 0 : r.key) || "";
    s && (a[s] = l[s]);
  }), a;
}), B = ({
  inStateData: e = [],
  inActiveColumns: o = []
} = {}) => {
  const t = e;
  let n = {};
  return o.forEach((l) => {
    const a = typeof l == "string" ? l : (l == null ? void 0 : l.key) || "";
    if (!a) return;
    const r = t.map((i) => i[a]), s = [...new Set(r)];
    n[a] = s;
  }), n;
}, P = ({
  inSource: e = {}
} = {}) => {
  var a, r, s, i, c;
  const o = ((r = (a = e == null ? void 0 : e.config) == null ? void 0 : a.datalist) == null ? void 0 : r.columns) || ((s = e == null ? void 0 : e.config) == null ? void 0 : s.columns) || (e == null ? void 0 : e.columns) || [], t = V({
    inData: e == null ? void 0 : e.originalData,
    inActiveColumns: o
  }), n = B({
    inStateData: t,
    inActiveColumns: o
  }), l = ((c = (i = e == null ? void 0 : e.config) == null ? void 0 : i.datalist) == null ? void 0 : c.topN) ?? (e == null ? void 0 : e.topN) ?? 0;
  return {
    activeColumns: o,
    stateData: t,
    distinctData: n,
    topN: l
  };
}, I = ({
  inData: e = []
} = {}) => Array.isArray(e) ? e : [];
class H extends k {
  constructor({
    inData: o = [],
    inColumns: t = [],
    inConfig: n = {},
    inTopN: l = 0
  } = {}) {
    super({
      inData: o,
      inColumns: t,
      inConfig: n,
      inTopN: l
    }), this.library = P({
      inSource: this.source
    });
  }
  get stateData() {
    return this.library.stateData;
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get topN() {
    return this.library.topN;
  }
  updateData({ inData: o = [] } = {}) {
    return this.library.stateData = I({
      inData: o
    }), this.library.stateData;
  }
}
const T = {
  version: "v24.0",
  description: "Pure spec engine no document at all"
}, M = (e) => {
  typeof globalThis > "u" || !e || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: T,
    buildSpecElement: e
  }, globalThis.ks.jsonToSpec = {
    meta: T,
    buildSpecElement: e
  });
}, q = ({ inSpec: e }) => {
  const o = e;
  return o == null;
}, F = ({ inSpec: e }) => typeof Node < "u" && e instanceof Node, D = ({ inSpecJson: e }) => {
  const o = e;
  return Array.isArray(o);
}, K = ({ inArray: e = [], inShowLog: o = !1, inDataJson: t }) => {
  const n = e, l = o, a = t;
  return Array.isArray(n) ? n.map((r) => p({
    inSpecJson: r,
    inShowLog: l,
    inDataJson: a
  })).flat().filter(Boolean) : [];
}, f = ({ inTemplate: e, inData: o, inRowIndex: t }) => {
  if (Number.isFinite(t)) {
    debugger;
    console.log("vvvvvvvvvvvvvv : ", t);
    let n = W({ inTemplate: e, inRowIndex: t });
    return A({ inTemplate: n, inData: o });
  } else
    return A({ inTemplate: e, inData: o });
}, A = ({ inTemplate: e, inData: o }) => {
  const t = e, n = o;
  return typeof t != "string" ? t : t.replace(/\$\{([^}]+)\}/g, (l, a) => {
    const r = a.trim().split(".");
    let s = n;
    for (const i of r) {
      if (s == null) return "";
      s = s[i];
    }
    return s == null ? "" : typeof s == "string" || typeof s == "number" || typeof s == "boolean" ? String(s ?? "") : s;
  });
}, W = ({ inTemplate: e, inRowIndex: o }) => {
  const t = e, n = o;
  return t.replace(/\#\{([^}]+)\}/g, (l, a) => {
    const r = a.trim().split(".");
    let s = n;
    console.log("aaaaaaa : ", o, e, r);
    for (const i of r) {
      if (s == null) return "";
      s = s[i];
    }
    return s === null || typeof s == "string" || typeof s == "number" || typeof s == "boolean" ? String(s ?? "") : s;
  });
}, R = ({ inSpec: e, inData: o, inShowLog: t }) => {
  const n = e, l = o, a = t;
  return "textContent" in n && (n.textContent = f({ inTemplate: n.textContent, inData: l })), "attributes" in n && typeof n.attributes == "object" && n.attributes && (n.attributes = Object.fromEntries(
    Object.entries(n.attributes).map(([r, s]) => [
      r,
      f({ inTemplate: s, inData: l })
    ])
  )), Array.isArray(n.children) && (n.children = n.children.map(
    (r) => p({
      inSpecJson: r,
      inShowLog: a,
      inDataJson: l
    })
  )), n;
}, z = ({ inSpec: e, inData: o }) => {
  const t = e, n = o, l = n.value;
  return D({ inSpecJson: l }) ? (t.children = [{
    tagName: "button",
    attributes: {
      class: "btn btn-primary btn-sm"
    },
    textContent: l.length
  }], delete t.textContent, t) : typeof l == "object" && l !== null && l.tagName ? (t.children = [l], delete t.textContent, t) : ("textContent" in t && (t.textContent = f({ inTemplate: t.textContent, inData: n })), "attributes" in t && typeof t.attributes == "object" && t.attributes && (t.attributes = Object.fromEntries(
    Object.entries(t.attributes).map(([a, r]) => [
      a,
      f({ inTemplate: r, inData: n })
    ])
  )), t);
}, G = ({ inSpec: e, inData: o }) => {
  const t = e, n = o;
  return "textContent" in t && (t.textContent === "${}" ? t.textContent = n : typeof t.textContent == "string" && (t.textContent = t.textContent.replaceAll("${}", () => n))), "attributes" in t && typeof t.attributes == "object" && t.attributes && (t.attributes = Object.fromEntries(
    Object.entries(t.attributes).map(([l, a]) => [
      l,
      a === "${}" ? n : typeof a == "string" ? a.replaceAll("${}", () => n) : a
    ])
  )), t;
}, b = ({ inSpecJson: e, inData: o, inRowIndex: t, inShowLog: n = !1 } = {}) => {
  const l = e, a = o, r = n, s = structuredClone(l);
  return r && console.log("buildSingleElement start : ", l, a), typeof a == "string" ? G({ inSpec: s, inData: a }) : typeof a == "object" && a !== null && "key" in a && "value" in a && !("children" in s && Array.isArray(s.children) && s.children.length > 0) ? z({ inSpec: s, inData: a }) : R({
    inSpec: s,
    inData: a,
    inShowLog: r
  });
}, Q = ({ inTemplate: e, inDataAsArray: o }) => {
  const t = o, n = e;
  return Array.isArray(t) ? t.map((a, r) => {
    const s = structuredClone(n);
    return p({
      inSpecJson: s,
      inDataJson: a,
      inRowIndex: r
    });
  }) : [];
}, U = ({ inTemplate: e, inDataAsObject: o }) => {
  const t = o, n = e;
  if (t === null || typeof t != "object")
    return [];
  const l = [];
  for (const [a, r] of Object.entries(t)) {
    const s = structuredClone(n), i = p({
      inSpecJson: s,
      inDataJson: {
        key: a,
        value: r
      }
    });
    l.push(i);
  }
  return l;
}, _ = ({
  inSpecJson: e,
  inShowLog: o = !1,
  inDataJson: t,
  inRowIndex: n
} = {}) => {
  if (Number.isFinite(n) && ("attributes" in e ? e.attributes.rowIndex = n : e.attributes = {
    rowIndex: n
  }), !["loopArray", "loopObject"].includes(e.jsonToSpec.operation)) {
    console.log(`inSpecJson.jsonToSpec.operation : can be loopArray or loopObject : ${e.jsonToSpec.operation}`);
    return;
  }
  if (e.jsonToSpec.operation === "loopArray") {
    const l = Q({
      inTemplate: e.jsonToSpec.template,
      inDataAsArray: t[e.jsonToSpec.source]
    }), {
      jsonToSpec: a,
      ...r
    } = e, s = {
      ...r,
      children: l
    };
    return b({
      inSpecJson: s,
      inShowLog: o,
      inData: t
    });
  }
  if (e.jsonToSpec.operation === "loopObject") {
    const l = U({
      inTemplate: e.jsonToSpec.template,
      inDataAsObject: t
    }), {
      jsonToSpec: a,
      ...r
    } = e, s = {
      ...r,
      children: l
    };
    return b({
      inSpecJson: s,
      inShowLog: o,
      inData: t
    });
  }
}, p = ({
  inSpecJson: e,
  inShowLog: o = !0,
  inDataJson: t,
  inRowIndex: n
} = {}) => q({ inSpec: e }) ? null : F({ inSpec: e }) ? e : (o && console.log("dispatchSpec 3 : ", e, t), D({ inSpecJson: e }) ? K({
  inArray: e,
  inShowLog: o,
  inDataJson: t
}) : "jsonToSpec" in e ? _({
  inSpecJson: e,
  inShowLog: o,
  inDataJson: t,
  inRowIndex: n
}) : b({
  inSpecJson: e,
  inShowLog: o,
  inRowIndex: n,
  inData: t
})), x = ({
  specJson: e,
  showLog: o = !1,
  dataJson: t
}) => {
  try {
    return o && console.log("jsonToSpec 1 : ", e), p({
      inSpecJson: e,
      inShowLog: o,
      inDataJson: t
    });
  } catch (n) {
    console.log("error : ", n);
  }
};
M(x);
const J = {
  version: "v31.0",
  description: "Pure DOM engine (v31)"
}, X = (e) => {
  typeof globalThis > "u" || !e || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom"] = {
    meta: J,
    buildSpecElement: e
  });
}, Y = "./tags.schema.json", Z = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, tt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "placeholder",
    "value",
    "name",
    "disabled",
    "readonly",
    "required",
    "list"
  ]
}, et = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "checked",
    "name",
    "value",
    "disabled",
    "required"
  ]
}, ot = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, nt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "action",
    "method",
    "autocomplete",
    "enctype",
    "name",
    "novalidate",
    "target"
  ],
  childTags: []
}, lt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "name",
    "disabled",
    "required",
    "multiple",
    "size"
  ],
  childTags: [
    "option"
  ]
}, at = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, st = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, rt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, it = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, ct = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, ut = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, dt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "border",
    "cellpadding",
    "cellspacing"
  ],
  childTags: [
    "caption",
    "colgroup",
    "thead",
    "tbody",
    "tfoot",
    "tr"
  ]
}, pt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ft = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ht = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, gt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, bt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, mt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, yt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, wt = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, Ct = {
  $schema: Y,
  div: Z,
  input: tt,
  checkbox: et,
  label: ot,
  form: nt,
  select: lt,
  p: at,
  h1: st,
  h2: rt,
  span: it,
  img: ct,
  button: ut,
  table: dt,
  thead: pt,
  tbody: ft,
  tfoot: ht,
  tr: gt,
  th: bt,
  td: mt,
  datalist: yt,
  option: wt
}, Tt = [
  "accesskey",
  "autocapitalize",
  "autofocus",
  "class",
  "contenteditable",
  "dir",
  "draggable",
  "enterkeyhint",
  "hidden",
  "id",
  "inert",
  "inputmode",
  "is",
  "itemid",
  "itemprop",
  "itemref",
  "itemscope",
  "itemtype",
  "lang",
  "nonce",
  "part",
  "popover",
  "role",
  "slot",
  "spellcheck",
  "style",
  "tabindex",
  "title",
  "translate"
], At = [
  "data-",
  "aria-"
], S = {
  attributes: Tt,
  wildcardPrefixes: At
}, m = ({ inSpec: e, spec: o } = {}) => {
  var s;
  const t = e ?? o, n = [], l = [];
  if (!t || typeof t != "object")
    return n.push("Spec must be a non-null object"), { isValid: !1, errors: n, warnings: l };
  if (Array.isArray(t))
    return t.forEach((i, c) => {
      const u = m({ inSpec: i });
      u.isValid || n.push(...u.errors.map((d) => `[${c}] ${d}`)), l.push(...u.warnings.map((d) => `[${c}] ${d}`));
    }), { isValid: n.length === 0, errors: n, warnings: l };
  const a = (s = t.tagName) == null ? void 0 : s.toLowerCase();
  if (!a || typeof a != "string")
    return n.push("Missing or invalid 'tagName'"), { isValid: !1, errors: n, warnings: l };
  const r = Ct[a];
  if (!r)
    l.push(`Tag '<${a}>' is not recognized in tags.json`);
  else if (r.allowsChildren === !1 && Array.isArray(t.children) && t.children.length > 0 && n.push(`Void tag '<${a}>' cannot have children`), r.allowsTextContent === !1 && t.textContent && l.push(`Tag '<${a}>' does not normally allow direct textContent`), t.attributes && typeof t.attributes == "object") {
    const i = /* @__PURE__ */ new Set([
      ...S.attributes || [],
      ...r.allowedAttributes || []
    ]), c = S.wildcardPrefixes || [];
    for (const u of Object.keys(t.attributes)) {
      const d = c.some((g) => u.startsWith(g));
      !i.has(u) && !d && l.push(`Attribute '${u}' is not recognized on '<${a}>'`);
    }
  }
  return Array.isArray(t.children) && t.children.forEach((i, c) => {
    const u = m({ inSpec: i });
    u.isValid || n.push(...u.errors.map((d) => `<${a}>.children[${c}]: ${d}`)), l.push(...u.warnings.map((d) => `<${a}>.children[${c}]: ${d}`));
  }), {
    isValid: n.length === 0,
    errors: n,
    warnings: l
  };
}, St = (e) => {
  var r;
  const o = e, t = o && typeof o == "object" && !Array.isArray(o) && ("spec" in o || "inSpec" in o), n = t ? o.inSpec ?? o.spec : o, l = t ? !!(o.inValidate ?? o.validate ?? o.debug) : !1, a = t ? !!(o.inShowLog ?? o.showLog) : !1;
  if (l && n) {
    const s = m({ inSpec: n });
    return s.isValid ? ((r = s.warnings) == null ? void 0 : r.length) > 0 && a && console.warn("[json-to-dom: validation warning]", s.warnings) : console.warn("[json-to-dom: validation error]", s.errors, s), s;
  }
  return { isValid: !0 };
}, Dt = ({ inSpec: e }) => {
  const o = e;
  return o == null;
}, xt = ({ inSpec: e }) => typeof Node < "u" && e instanceof Node, jt = ({ inSpec: e }) => {
  const o = e;
  return Array.isArray(o);
}, vt = ({ inSpec: e }) => {
  const o = e;
  return typeof o == "object" && o !== null && !Array.isArray(o);
}, $t = ({ inSpec: e, inShowLog: o = !1 }) => {
  const t = e, n = o;
  return Array.isArray(t) ? t.map((l) => y({
    inSpec: l,
    inShowLog: n
  })).flat().filter(Boolean) : [];
}, Nt = ({ inTagName: e }) => {
  const o = e == null ? void 0 : e.toLowerCase();
  if (!o) return null;
  if (o === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(o);
}, Lt = ({ inElement: e, inTextContent: o, inAllowsTextContent: t = !0, inTagName: n, inShowLog: l = !1 }) => {
  const a = e, r = o, s = t, i = n, c = l;
  return !a || r === void 0 || r === null ? a : s ? (a.textContent = r, a) : (c && console.warn(`[json-to-dom v11] textContent is not allowed on <${i}>; discarded "${r}"`), a);
}, Et = ({ inElement: e, inProperties: o }) => {
  const t = e, n = o;
  return t && n && typeof n == "object" && Object.assign(t, n), t;
}, kt = ({ inElement: e, inAttributes: o }) => {
  const t = e, n = o;
  return !t || !n || typeof n != "object" || Object.entries(n).forEach(([l, a]) => {
    l === "class" ? t.className = a : typeof a == "boolean" ? a ? t.setAttribute(l, "") : t.removeAttribute(l) : a != null && t.setAttribute(l, String(a));
  }), t;
}, Ot = ({ inElement: e, inClassList: o }) => {
  const t = e, n = o;
  if (!t || !n) return t;
  let l = [];
  return typeof n == "string" ? l = n.split(/\s+/).filter(Boolean) : Array.isArray(n) && (l = n.filter((a) => typeof a == "string" && a.trim().length > 0)), l.length > 0 && t.classList.add(...l), t;
}, Vt = ({ inElement: e, inChildren: o, inAllowsChildren: t = !0, inTagName: n, inShowLog: l = !1 }) => {
  const a = e, r = o, s = t, i = n, c = l;
  return !a || !Array.isArray(r) || r.length === 0 ? a : s ? (r.forEach((u) => {
    typeof Node < "u" && u instanceof Node ? a.appendChild(u) : (typeof u == "string" || typeof u == "number") && a.appendChild(document.createTextNode(String(u)));
  }), a) : (c && console.warn(`[json-to-dom v11] Children are not allowed on void tag <${i}>; discarded ${r.length} child nodes.`), a);
}, Bt = ({ inSpec: e, inClassList: o }) => {
  const t = e, n = o || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const l = Nt({ inTagName: t.tagName });
  return l ? (Lt({
    inElement: l,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), Et({
    inElement: l,
    inProperties: t.properties
  }), kt({
    inElement: l,
    inAttributes: t.attributes
  }), Ot({
    inElement: l,
    inClassList: n
  }), Vt({
    inElement: l,
    inChildren: t.children,
    inTagName: t.tagName
  }), l) : null;
}, Pt = ({ inChildren: e, inShowLog: o = !1 }) => {
  const t = e, n = o;
  return Array.isArray(t) ? t.map((l) => typeof l == "string" || typeof l == "number" ? typeof document < "u" ? document.createTextNode(String(l)) : String(l) : y({
    inSpec: l,
    inShowLog: n
  })).flat().filter(Boolean) : [];
}, It = ({ inSpec: e, inShowLog: o = !1 }) => {
  const t = e, n = o;
  if (!(t != null && t.tagName))
    return n && console.warn("[json-to-dom v23] Missing tagName on spec:", t), null;
  const l = Array.isArray(t.children) && t.children.length > 0 ? Pt({
    inChildren: t.children,
    inShowLog: n
  }) : [];
  return Bt({
    inSpec: {
      ...t,
      children: l
    }
  });
}, y = ({ inSpec: e, inShowLog: o = !1 } = {}) => {
  const t = e, n = o;
  return Dt({ inSpec: t }) ? null : xt({ inSpec: t }) ? t : jt({ inSpec: t }) ? $t({ inSpec: t, inShowLog: n }) : vt({ inSpec: t }) ? It({ inSpec: t, inShowLog: n }) : null;
}, Ht = ({ inArgs: e, inSpec: o, inShowLog: t } = {}) => {
  var i;
  const n = e, l = o, a = t;
  let r = l !== void 0 ? l : n, s = !!a;
  return n && typeof n == "object" && !Array.isArray(n) && !(typeof Node < "u" && n instanceof Node) && ("inSpec" in n ? (r = n.inSpec, s = !!n.inShowLog) : "spec" in n && (r = n.spec, s = !!n.showLog)), typeof globalThis < "u" && ((i = globalThis == null ? void 0 : globalThis.ks) != null && i.showLog) && (s = !0), {
    spec: r,
    showLog: s
  };
}, Mt = (e) => {
  const o = e, t = o && typeof o == "object" && !Array.isArray(o) && !(typeof Node < "u" && o instanceof Node) && ("spec" in o || "inSpec" in o), n = t ? o.spec ?? o.inSpec : o, l = t ? !!(o.showLog ?? o.inShowLog) : !1, { spec: a } = Ht({ inSpec: n, inShowLog: l });
  return y({ inSpec: a, inShowLog: l });
}, qt = ({ element: e, targetHtmlId: o } = {}) => {
  const t = e, n = o;
  if (!n || typeof document > "u") return;
  const l = document.getElementById(n);
  l && (l.innerHTML = "", Array.isArray(t) ? t.forEach((a) => {
    a instanceof Node && l.appendChild(a);
  }) : t instanceof Node && l.appendChild(t));
}, Ft = (e = {}) => {
  const o = e, t = o.element, n = o.targetHtmlId;
  return n && typeof document < "u" && qt({ element: t, targetHtmlId: n }), t;
}, j = (e) => {
  St(e);
  const o = Mt(e), t = (e == null ? void 0 : e.targetHtmlId) ?? (e == null ? void 0 : e.domIdToPushTo) ?? (e == null ? void 0 : e.inDomIdToPushTo);
  return Ft({ element: o, targetHtmlId: t });
};
X(j);
const Kt = "datalist", Wt = {
  id: "dl1"
}, Rt = {
  operation: "loopArray",
  source: "data",
  template: {
    tagName: "option",
    attributes: {
      value: "${}"
    },
    textContent: "${}"
  }
}, zt = [], Gt = {
  tagName: Kt,
  attributes: Wt,
  jsonToSpec: Rt,
  children: zt
}, Qt = ({ inDataList: e } = {}) => {
  const t = e.store.library.distinctData, n = [];
  for (const [a, r] of Object.entries(t)) {
    const s = structuredClone(Gt);
    s.attributes.id = a, s.jsonToSpec.source = a, n.push(s);
  }
  return {
    renderStructure: ({ targetContainerId: a } = {}) => {
      const r = x({
        specJson: n,
        dataJson: t
      });
      return j({ spec: r, targetHtmlId: a }), r;
    }
  };
}, Ut = async ({ inDataList: e, inQuery: o = {} } = {}) => {
  const t = e, n = o;
  if (!t) return null;
  if (typeof t.dataProvider == "function")
    try {
      const l = await t.dataProvider(n);
      Array.isArray(l) && (t.store.updateData({ inData: l }), t.renderStructure());
    } catch (l) {
      console.error("[json-to-dom-datalist:actions:load] Error loading data:", l);
    }
  return t.store.stateData;
}, _t = ({ inDataList: e, inData: o = [] } = {}) => {
  const t = e, n = o;
  return t ? (t.store.updateData({ inData: n }), t.renderStructure()) : null;
}, Jt = ({ inDataList: e } = {}) => {
  const o = e;
  return {
    load: async ({ inQuery: l, query: a } = {}) => await Ut({ inDataList: o, inQuery: l ?? a ?? {} }),
    update: ({ inData: l, data: a } = {}) => _t({ inDataList: o, inData: l ?? a ?? [] })
  };
}, v = ({ inData: e = [], inKey: o = "", inTopN: t = 0 } = {}) => {
  const n = e, l = o, a = t;
  if (!Array.isArray(n) || !l)
    return [];
  const r = /* @__PURE__ */ new Map();
  for (const i of n) {
    if (!i || typeof i != "object") continue;
    const c = i[l];
    if (c != null) {
      const u = String(c).trim();
      u !== "" && r.set(u, (r.get(u) || 0) + 1);
    }
  }
  const s = Array.from(r.entries()).map(([i, c]) => ({ value: i, count: c })).sort((i, c) => i.value.localeCompare(c.value, void 0, { sensitivity: "base", numeric: !0 }));
  return a > 0 && Number.isFinite(a) ? s.slice(0, a) : s;
}, Xt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, Yt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "placeholder",
    "value",
    "name",
    "disabled",
    "readonly",
    "required",
    "list"
  ]
}, Zt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "checked",
    "name",
    "value",
    "disabled",
    "required"
  ]
}, te = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, ee = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, oe = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "border",
    "cellpadding",
    "cellspacing"
  ],
  childTags: [
    "caption",
    "colgroup",
    "thead",
    "tbody",
    "tfoot",
    "tr"
  ]
}, ne = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, le = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ae = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, se = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, re = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, ie = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, ce = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, ue = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, de = {
  div: Xt,
  input: Yt,
  checkbox: Zt,
  label: te,
  button: ee,
  table: oe,
  thead: ne,
  tbody: le,
  tfoot: ae,
  tr: se,
  th: re,
  td: ie,
  datalist: ce,
  option: ue
};
class h {
  constructor({
    data: o = [],
    columns: t = [],
    config: n = {},
    dataProvider: l = null,
    targetContainerId: a = "datalist-container",
    inColumns: r,
    inConfig: s,
    inDataProvider: i,
    inTargetContainerId: c
  } = {}) {
    const u = o, d = r ?? t, g = s ?? n, $ = i ?? l, N = c ?? a;
    this.containerId = N, this.dataProvider = $, this.element = null, this.controlsTree = null, this.tags = de, this.store = new H({
      inData: u,
      inColumns: d,
      inConfig: g
    }), this.methods = Qt({ inDataList: this }), this.actions = Jt({ inDataList: this });
  }
  render(o = {}) {
    return this.methods.renderStructure(o);
  }
  async load(o = {}) {
    return await this.actions.load(o);
  }
  update(o = {}) {
    return this.actions.update(o);
  }
  getGroupedData({ inKey: o = "", inTopN: t } = {}) {
    const n = o, l = t ?? this.store.topN ?? 0;
    return v({
      inData: this.store.stateData,
      inKey: n,
      inTopN: l
    });
  }
  getControlsTree() {
    return this.controlsTree;
  }
  get data() {
    return this.store.stateData;
  }
  get columns() {
    return this.store.activeColumns;
  }
  get config() {
    return this.store.config;
  }
}
h.groupBy = v;
h.layouts = [];
h.themes = [];
L(h);
export {
  h as DataList,
  h as default
};
