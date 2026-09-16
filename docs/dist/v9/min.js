const N = {
  version: "v9.0",
  description: "build store from data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, v = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom-datalist"] = {
    meta: N,
    DataList: n
  });
}, y = ({ inData: n = [], inColumns: e = [], inConfig: t = {}, inTopN: o } = {}) => {
  const l = n, a = e, s = t, r = o;
  return {
    originalData: Array.isArray(l) ? typeof structuredClone == "function" ? structuredClone(l) : JSON.parse(JSON.stringify(l)) : [],
    columns: Array.isArray(a) ? a : [],
    config: s || {},
    topN: r
  };
}, j = ({ inColumnsCatalog: n = [], inColumnKeys: e = [] } = {}) => {
  const t = n, o = e;
  if (Array.isArray(o) && o.length > 0) {
    const l = new Map((Array.isArray(t) ? t : []).map((r) => [r.key, r])), a = [], s = [];
    for (const r of o) {
      const i = l.get(r);
      i ? s.push(i) : a.push(r);
    }
    return a.length > 0 && console.warn(
      `[json-to-dom-datalist] Warning: Config requested columns [${a.map((r) => `"${r}"`).join(", ")}] that do not exist in the columns catalog.`
    ), s;
  }
  return Array.isArray(t) ? t : [];
};
class L {
  constructor({ inData: e = [], inColumns: t = [], inConfig: o = {}, inTopN: l } = {}) {
    const a = e, s = t, r = o, i = l;
    this.source = y({
      inData: a,
      inColumns: s,
      inConfig: r,
      inTopN: i
    });
  }
  _buildSource(e) {
    return y(e);
  }
  _resolveActiveColumns(e) {
    return j(e);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const k = ({ inData: n } = {}) => {
  const e = n;
  if (e == null)
    return [];
  if (typeof structuredClone == "function")
    try {
      return structuredClone(e);
    } catch {
    }
  try {
    return JSON.parse(JSON.stringify(e));
  } catch {
    return Array.isArray(e) ? [...e] : { ...e };
  }
}, E = ({
  inData: n = [],
  inActiveColumns: e = []
} = {}) => k({
  inData: n
}).map((l) => {
  let a = {};
  return e.forEach((s) => {
    const r = typeof s == "string" ? s : (s == null ? void 0 : s.key) || "";
    r && (a[r] = l[r]);
  }), a;
}), O = ({
  inStateData: n = [],
  inActiveColumns: e = []
} = {}) => {
  const t = n;
  let o = {};
  return e.forEach((l) => {
    const a = typeof l == "string" ? l : (l == null ? void 0 : l.key) || "";
    if (!a) return;
    const s = t.map((i) => i[a]), r = [...new Set(s)];
    o[a] = r;
  }), o;
}, I = ({
  inSource: n = {}
} = {}) => {
  var a, s, r, i, c;
  const e = ((s = (a = n == null ? void 0 : n.config) == null ? void 0 : a.datalist) == null ? void 0 : s.columns) || ((r = n == null ? void 0 : n.config) == null ? void 0 : r.columns) || (n == null ? void 0 : n.columns) || [], t = E({
    inData: n == null ? void 0 : n.originalData,
    inActiveColumns: e
  }), o = O({
    inStateData: t,
    inActiveColumns: e
  }), l = ((c = (i = n == null ? void 0 : n.config) == null ? void 0 : i.datalist) == null ? void 0 : c.topN) ?? (n == null ? void 0 : n.topN) ?? 0;
  return {
    activeColumns: e,
    stateData: t,
    distinctData: o,
    topN: l
  };
}, V = ({
  inData: n = []
} = {}) => Array.isArray(n) ? n : [];
class B extends L {
  constructor({
    inData: e = [],
    inColumns: t = [],
    inConfig: o = {},
    inTopN: l = 0
  } = {}) {
    super({
      inData: e,
      inColumns: t,
      inConfig: o,
      inTopN: l
    }), this.library = I({
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
  updateData({ inData: e = [] } = {}) {
    return this.library.stateData = V({
      inData: e
    }), this.library.stateData;
  }
}
const J = {
  version: "18.0.0",
  name: "json-to-spec/v18",
  description: "Minimalist 2-layer compiler: pure value replace + jsonToSpec iterate"
}, P = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: J,
    compile: n
  });
}, A = ({ inData: n, inDataKey: e }) => {
  const t = e;
  if (t === "") return n;
  let o = n[t];
  return t.includes(".") && (o = t.split(".").reduce(
    (s, r) => s == null ? void 0 : s[r],
    n
  )), o;
}, M = ({
  inNode: n,
  inData: e
} = {}) => {
  const t = n, o = e;
  if (!(t != null && t.textContent)) return "no-textContent";
  if (typeof t.textContent != "string") return "not-a-string";
  if (!t.textContent.includes("${")) return "no-template-token";
  const l = t.textContent.replace(/^\$\{/, "").replace(/\}$/, "");
  t.textContent = A({
    inData: o,
    inDataKey: l
  });
}, K = ({
  inNode: n,
  inData: e
} = {}) => {
  const t = n, o = e;
  if ("attributes" in t) {
    const l = Object.fromEntries(
      Object.entries(t.attributes || {}).map(([a, s]) => [
        a,
        typeof s == "string" && s.includes("${") ? A({
          inData: o,
          inDataKey: s.replace(/^\$\{/, "").replace(/\}$/, "")
        }) : s
      ])
    );
    t.attributes = { ...l };
  }
}, R = ({
  inNode: n,
  inData: e
} = {}) => {
  const t = n, o = e;
  M({ inNode: t, inData: o }), K({ inNode: t, inData: o });
}, H = ({
  inTemplate: n,
  inSourceValues: e
} = {}) => e.map((l) => {
  const a = structuredClone(n);
  return w({
    inNode: a,
    inData: l,
    inOperation: "replace"
  });
}), q = ({
  inNode: n,
  inData: e
} = {}) => {
  const t = n, o = e;
  if (!("jsonToSpec" in t) || !("operation" in t.jsonToSpec) || t.jsonToSpec.operation !== "iterate" || !("source" in t.jsonToSpec)) return;
  const l = o[t.jsonToSpec.source], a = H({
    inTemplate: t.jsonToSpec.template,
    inSourceValues: l
  });
  t.children = a;
}, b = ({ inNode: n, inData: e, inOperation: t }) => {
  const o = n, l = t;
  if (Array.isArray(o)) {
    const a = [];
    for (const s of o) {
      const r = w({
        inNode: s,
        inData: e,
        inOperation: l
      });
      Array.isArray(r) ? a.push(...r) : r != null && a.push(r);
    }
    return a;
  }
}, w = ({
  inNode: n,
  inData: e = {},
  inOperation: t
} = {}) => {
  const o = n, l = t;
  if (o == null)
    return o;
  if (Array.isArray(o))
    return b({
      inNode: o,
      inData: e,
      inOperation: l
    });
  if ("children" in o && Array.isArray(o == null ? void 0 : o.children) && (o.children = b({
    inNode: o == null ? void 0 : o.children,
    inData: e,
    inOperation: l
  })), typeof o != "object")
    return o;
  switch (l) {
    case "replace":
      typeof o == "object" && R({
        inNode: o,
        inData: e
      });
      break;
    case "iterateDo":
      q({
        inNode: o,
        inData: e
      });
  }
  return o;
}, C = ({ inStructureAsJson: n, inDataAsJson: e, inOperation: t }) => {
  try {
    return w({
      inNode: n,
      inData: e,
      inOperation: t
    });
  } catch (o) {
    throw console.error("[json-to-spec/v17] replace error:", o), o;
  }
}, z = {
  name: "json-to-spec/v18"
}, h = (n, e = {}, t = !1) => {
  let o = n, l = e;
  t && console.log(z.name, o, l);
  try {
    const a = C({
      inStructureAsJson: o,
      inDataAsJson: l,
      inOperation: "iterateDo"
    }), s = C({
      inStructureAsJson: a,
      inDataAsJson: l,
      inOperation: "replace"
    });
    return console.log("iteratedData : ", a, s), s;
  } catch (a) {
    throw console.error("[json-to-spec/v17] compile error:", a), a;
  }
};
P(h);
const F = {
  version: "v31.0",
  description: "Pure DOM engine (v31)"
}, W = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom"] = {
    meta: F,
    buildSpecElement: n
  });
}, G = "./tags.schema.json", Q = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, U = {
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
}, _ = {
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
}, X = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, Y = {
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
}, Z = {
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
}, tt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, et = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, ot = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, nt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, lt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, at = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, st = {
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
}, rt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, it = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ct = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, dt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, ut = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, pt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, ft = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, ht = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, gt = {
  $schema: G,
  div: Q,
  input: U,
  checkbox: _,
  label: X,
  form: Y,
  select: Z,
  p: tt,
  h1: et,
  h2: ot,
  span: nt,
  img: lt,
  button: at,
  table: st,
  thead: rt,
  tbody: it,
  tfoot: ct,
  tr: dt,
  th: ut,
  td: pt,
  datalist: ft,
  option: ht
}, wt = [
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
], mt = [
  "data-",
  "aria-"
], T = {
  attributes: wt,
  wildcardPrefixes: mt
}, g = ({ inSpec: n, spec: e } = {}) => {
  var r;
  const t = n ?? e, o = [], l = [];
  if (!t || typeof t != "object")
    return o.push("Spec must be a non-null object"), { isValid: !1, errors: o, warnings: l };
  if (Array.isArray(t))
    return t.forEach((i, c) => {
      const d = g({ inSpec: i });
      d.isValid || o.push(...d.errors.map((u) => `[${c}] ${u}`)), l.push(...d.warnings.map((u) => `[${c}] ${u}`));
    }), { isValid: o.length === 0, errors: o, warnings: l };
  const a = (r = t.tagName) == null ? void 0 : r.toLowerCase();
  if (!a || typeof a != "string")
    return o.push("Missing or invalid 'tagName'"), { isValid: !1, errors: o, warnings: l };
  const s = gt[a];
  if (!s)
    l.push(`Tag '<${a}>' is not recognized in tags.json`);
  else if (s.allowsChildren === !1 && Array.isArray(t.children) && t.children.length > 0 && o.push(`Void tag '<${a}>' cannot have children`), s.allowsTextContent === !1 && t.textContent && l.push(`Tag '<${a}>' does not normally allow direct textContent`), t.attributes && typeof t.attributes == "object") {
    const i = /* @__PURE__ */ new Set([
      ...T.attributes || [],
      ...s.allowedAttributes || []
    ]), c = T.wildcardPrefixes || [];
    for (const d of Object.keys(t.attributes)) {
      const u = c.some((f) => d.startsWith(f));
      !i.has(d) && !u && l.push(`Attribute '${d}' is not recognized on '<${a}>'`);
    }
  }
  return Array.isArray(t.children) && t.children.forEach((i, c) => {
    const d = g({ inSpec: i });
    d.isValid || o.push(...d.errors.map((u) => `<${a}>.children[${c}]: ${u}`)), l.push(...d.warnings.map((u) => `<${a}>.children[${c}]: ${u}`));
  }), {
    isValid: o.length === 0,
    errors: o,
    warnings: l
  };
}, yt = (n) => {
  var s;
  const e = n, t = e && typeof e == "object" && !Array.isArray(e) && ("spec" in e || "inSpec" in e), o = t ? e.inSpec ?? e.spec : e, l = t ? !!(e.inValidate ?? e.validate ?? e.debug) : !1, a = t ? !!(e.inShowLog ?? e.showLog) : !1;
  if (l && o) {
    const r = g({ inSpec: o });
    return r.isValid ? ((s = r.warnings) == null ? void 0 : s.length) > 0 && a && console.warn("[json-to-dom: validation warning]", r.warnings) : console.warn("[json-to-dom: validation error]", r.errors, r), r;
  }
  return { isValid: !0 };
}, bt = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, Ct = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, Tt = ({ inSpec: n }) => {
  const e = n;
  return Array.isArray(e);
}, At = ({ inSpec: n }) => {
  const e = n;
  return typeof e == "object" && e !== null && !Array.isArray(e);
}, Dt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((l) => m({
    inSpec: l,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, St = ({ inTagName: n }) => {
  const e = n == null ? void 0 : n.toLowerCase();
  if (!e) return null;
  if (e === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(e);
}, xt = ({ inElement: n, inTextContent: e, inAllowsTextContent: t = !0, inTagName: o, inShowLog: l = !1 }) => {
  const a = n, s = e, r = t, i = o, c = l;
  return !a || s === void 0 || s === null ? a : r ? (a.textContent = s, a) : (c && console.warn(`[json-to-dom v11] textContent is not allowed on <${i}>; discarded "${s}"`), a);
}, $t = ({ inElement: n, inProperties: e }) => {
  const t = n, o = e;
  return t && o && typeof o == "object" && Object.assign(t, o), t;
}, Nt = ({ inElement: n, inAttributes: e }) => {
  const t = n, o = e;
  return !t || !o || typeof o != "object" || Object.entries(o).forEach(([l, a]) => {
    l === "class" ? t.className = a : typeof a == "boolean" ? a ? t.setAttribute(l, "") : t.removeAttribute(l) : a != null && t.setAttribute(l, String(a));
  }), t;
}, vt = ({ inElement: n, inClassList: e }) => {
  const t = n, o = e;
  if (!t || !o) return t;
  let l = [];
  return typeof o == "string" ? l = o.split(/\s+/).filter(Boolean) : Array.isArray(o) && (l = o.filter((a) => typeof a == "string" && a.trim().length > 0)), l.length > 0 && t.classList.add(...l), t;
}, jt = ({ inElement: n, inChildren: e, inAllowsChildren: t = !0, inTagName: o, inShowLog: l = !1 }) => {
  const a = n, s = e, r = t, i = o, c = l;
  return !a || !Array.isArray(s) || s.length === 0 ? a : r ? (s.forEach((d) => {
    typeof Node < "u" && d instanceof Node ? a.appendChild(d) : (typeof d == "string" || typeof d == "number") && a.appendChild(document.createTextNode(String(d)));
  }), a) : (c && console.warn(`[json-to-dom v11] Children are not allowed on void tag <${i}>; discarded ${s.length} child nodes.`), a);
}, Lt = ({ inSpec: n, inClassList: e }) => {
  const t = n, o = e || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const l = St({ inTagName: t.tagName });
  return l ? (xt({
    inElement: l,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), $t({
    inElement: l,
    inProperties: t.properties
  }), Nt({
    inElement: l,
    inAttributes: t.attributes
  }), vt({
    inElement: l,
    inClassList: o
  }), jt({
    inElement: l,
    inChildren: t.children,
    inTagName: t.tagName
  }), l) : null;
}, kt = ({ inChildren: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((l) => typeof l == "string" || typeof l == "number" ? typeof document < "u" ? document.createTextNode(String(l)) : String(l) : m({
    inSpec: l,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, Et = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  if (!(t != null && t.tagName))
    return o && console.warn("[json-to-dom v23] Missing tagName on spec:", t), null;
  const l = Array.isArray(t.children) && t.children.length > 0 ? kt({
    inChildren: t.children,
    inShowLog: o
  }) : [];
  return Lt({
    inSpec: {
      ...t,
      children: l
    }
  });
}, m = ({ inSpec: n, inShowLog: e = !1 } = {}) => {
  const t = n, o = e;
  return bt({ inSpec: t }) ? null : Ct({ inSpec: t }) ? t : Tt({ inSpec: t }) ? Dt({ inSpec: t, inShowLog: o }) : At({ inSpec: t }) ? Et({ inSpec: t, inShowLog: o }) : null;
}, Ot = ({ inArgs: n, inSpec: e, inShowLog: t } = {}) => {
  var i;
  const o = n, l = e, a = t;
  let s = l !== void 0 ? l : o, r = !!a;
  return o && typeof o == "object" && !Array.isArray(o) && !(typeof Node < "u" && o instanceof Node) && ("inSpec" in o ? (s = o.inSpec, r = !!o.inShowLog) : "spec" in o && (s = o.spec, r = !!o.showLog)), typeof globalThis < "u" && ((i = globalThis == null ? void 0 : globalThis.ks) != null && i.showLog) && (r = !0), {
    spec: s,
    showLog: r
  };
}, It = (n) => {
  const e = n, t = e && typeof e == "object" && !Array.isArray(e) && !(typeof Node < "u" && e instanceof Node) && ("spec" in e || "inSpec" in e), o = t ? e.spec ?? e.inSpec : e, l = t ? !!(e.showLog ?? e.inShowLog) : !1, { spec: a } = Ot({ inSpec: o, inShowLog: l });
  return m({ inSpec: a, inShowLog: l });
}, Vt = ({ element: n, targetHtmlId: e } = {}) => {
  const t = n, o = e;
  if (!o || typeof document > "u") return;
  const l = document.getElementById(o);
  l && (l.innerHTML = "", Array.isArray(t) ? t.forEach((a) => {
    a instanceof Node && l.appendChild(a);
  }) : t instanceof Node && l.appendChild(t));
}, Bt = (n = {}) => {
  const e = n, t = e.element, o = e.targetHtmlId;
  return o && typeof document < "u" && Vt({ element: t, targetHtmlId: o }), t;
}, D = (n) => {
  yt(n);
  const e = It(n), t = (n == null ? void 0 : n.targetHtmlId) ?? (n == null ? void 0 : n.domIdToPushTo) ?? (n == null ? void 0 : n.inDomIdToPushTo);
  return Bt({ element: e, targetHtmlId: t });
};
W(D);
const Jt = "datalist", Pt = {
  id: "dl1"
}, Mt = {
  operation: "iterate",
  source: "data",
  template: {
    tagName: "option",
    attributes: {
      value: "${}"
    },
    textContent: "${}"
  }
}, Kt = [], Rt = {
  tagName: Jt,
  attributes: Pt,
  jsonToSpec: Mt,
  children: Kt
}, Ht = ({ inDataList: n } = {}) => {
  const e = n.store.library.distinctData, t = [];
  for (const [a, s] of Object.entries(e)) {
    const r = structuredClone(Rt);
    r.attributes.id = a, r.jsonToSpec.source = a, t.push(r);
  }
  return {
    buildSpec: () => window.ks["json-to-spec"].compile(t, e, !0),
    renderStructure: ({ inContainerId: a, inContainer: s, targetContainerId: r } = {}) => {
      const i = h(t, e, !0);
      return console.log("specAsJsonToDom--------: ", h, i), D({ spec: i, targetHtmlId: "datalist-container" }), i;
    }
  };
}, qt = async ({ inDataList: n, inQuery: e = {} } = {}) => {
  const t = n, o = e;
  if (!t) return null;
  if (typeof t.dataProvider == "function")
    try {
      const l = await t.dataProvider(o);
      Array.isArray(l) && (t.store.updateData({ inData: l }), t.renderStructure());
    } catch (l) {
      console.error("[json-to-dom-datalist:actions:load] Error loading data:", l);
    }
  return t.store.stateData;
}, zt = ({ inDataList: n, inData: e = [] } = {}) => {
  const t = n, o = e;
  return t ? (t.store.updateData({ inData: o }), t.renderStructure()) : null;
}, Ft = ({ inDataList: n } = {}) => {
  const e = n;
  return {
    load: async ({ inQuery: l, query: a } = {}) => await qt({ inDataList: e, inQuery: l ?? a ?? {} }),
    update: ({ inData: l, data: a } = {}) => zt({ inDataList: e, inData: l ?? a ?? [] })
  };
}, S = ({ inData: n = [], inKey: e = "", inTopN: t = 0 } = {}) => {
  const o = n, l = e, a = t;
  if (!Array.isArray(o) || !l)
    return [];
  const s = /* @__PURE__ */ new Map();
  for (const i of o) {
    if (!i || typeof i != "object") continue;
    const c = i[l];
    if (c != null) {
      const d = String(c).trim();
      d !== "" && s.set(d, (s.get(d) || 0) + 1);
    }
  }
  const r = Array.from(s.entries()).map(([i, c]) => ({ value: i, count: c })).sort((i, c) => i.value.localeCompare(c.value, void 0, { sensitivity: "base", numeric: !0 }));
  return a > 0 && Number.isFinite(a) ? r.slice(0, a) : r;
}, Wt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, Gt = {
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
}, Qt = {
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
}, Ut = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, _t = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Xt = {
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
}, Yt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Zt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, te = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ee = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, oe = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, ne = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, le = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, ae = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, se = {
  div: Wt,
  input: Gt,
  checkbox: Qt,
  label: Ut,
  button: _t,
  table: Xt,
  thead: Yt,
  tbody: Zt,
  tfoot: te,
  tr: ee,
  th: oe,
  td: ne,
  datalist: le,
  option: ae
};
class p {
  constructor({
    data: e = [],
    columns: t = [],
    config: o = {},
    dataProvider: l = null,
    targetContainerId: a = "datalist-container",
    inColumns: s,
    inConfig: r,
    inDataProvider: i,
    inTargetContainerId: c
  } = {}) {
    const d = e, u = s ?? t, f = r ?? o, x = i ?? l, $ = c ?? a;
    this.containerId = $, this.dataProvider = x, this.element = null, this.controlsTree = null, this.tags = se, this.store = new B({
      inData: d,
      inColumns: u,
      inConfig: f
    }), this.methods = Ht({ inDataList: this }), this.actions = Ft({ inDataList: this }), this.spec = this.buildSpec();
  }
  buildSpec() {
    return this.methods.buildSpec();
  }
  render(e = {}) {
    return this.methods.renderStructure(e);
  }
  async load(e = {}) {
    return await this.actions.load(e);
  }
  update(e = {}) {
    return this.actions.update(e);
  }
  getGroupedData({ inKey: e = "", inTopN: t } = {}) {
    const o = e, l = t ?? this.store.topN ?? 0;
    return S({
      inData: this.store.stateData,
      inKey: o,
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
p.groupBy = S;
p.layouts = [];
p.themes = [];
v(p);
export {
  p as DataList,
  p as default
};
