const p = ({ inData: e = [], inColumns: t = [], inConfig: a = {}, inTopN: s } = {}) => {
  const n = e, o = t, r = a, l = s;
  return {
    originalData: Array.isArray(n) ? typeof structuredClone == "function" ? structuredClone(n) : JSON.parse(JSON.stringify(n)) : [],
    columns: Array.isArray(o) ? o : [],
    config: r || {},
    topN: l
  };
}, w = ({ inColumnsCatalog: e = [], inColumnKeys: t = [] } = {}) => {
  const a = e, s = t;
  if (Array.isArray(s) && s.length > 0) {
    const n = new Map((Array.isArray(a) ? a : []).map((l) => [l.key, l])), o = [], r = [];
    for (const l of s) {
      const i = n.get(l);
      i ? r.push(i) : o.push(l);
    }
    return o.length > 0 && console.warn(
      `[json-to-dom-datalist] Warning: Config requested columns [${o.map((l) => `"${l}"`).join(", ")}] that do not exist in the columns catalog.`
    ), r;
  }
  return Array.isArray(a) ? a : [];
};
class D {
  constructor({ inData: t = [], inColumns: a = [], inConfig: s = {}, inTopN: n } = {}) {
    const o = t, r = a, l = s, i = n;
    this.source = p({
      inData: o,
      inColumns: r,
      inConfig: l,
      inTopN: i
    });
  }
  _buildSource(t) {
    return p(t);
  }
  _resolveActiveColumns(t) {
    return w(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const T = ({ inData: e } = {}) => {
  const t = e;
  if (t == null)
    return [];
  if (typeof structuredClone == "function")
    try {
      return structuredClone(t);
    } catch {
    }
  try {
    return JSON.parse(JSON.stringify(t));
  } catch {
    return Array.isArray(t) ? [...t] : { ...t };
  }
}, A = ({
  inData: e = [],
  inActiveColumns: t = []
} = {}) => T({
  inData: e
}).map((n) => {
  let o = {};
  return t.forEach((r) => {
    const l = typeof r == "string" ? r : (r == null ? void 0 : r.key) || "";
    l && (o[l] = n[l]);
  }), o;
}), v = ({
  inStateData: e = [],
  inActiveColumns: t = []
} = {}) => {
  const a = e;
  let s = {};
  return t.forEach((n) => {
    const o = typeof n == "string" ? n : (n == null ? void 0 : n.key) || "";
    if (!o) return;
    const r = a.map((i) => i[o]), l = [...new Set(r)];
    s[o] = l;
  }), s;
}, N = ({
  inSource: e = {}
} = {}) => {
  var o, r, l, i, c;
  const t = ((r = (o = e == null ? void 0 : e.config) == null ? void 0 : o.datalist) == null ? void 0 : r.columns) || ((l = e == null ? void 0 : e.config) == null ? void 0 : l.columns) || (e == null ? void 0 : e.columns) || [], a = A({
    inData: e == null ? void 0 : e.originalData,
    inActiveColumns: t
  }), s = v({
    inStateData: a,
    inActiveColumns: t
  }), n = ((c = (i = e == null ? void 0 : e.config) == null ? void 0 : i.datalist) == null ? void 0 : c.topN) ?? (e == null ? void 0 : e.topN) ?? 0;
  return {
    activeColumns: t,
    stateData: a,
    distinctData: s,
    topN: n
  };
}, x = ({
  inData: e = []
} = {}) => Array.isArray(e) ? e : [];
class k extends D {
  constructor({
    inData: t = [],
    inColumns: a = [],
    inConfig: s = {},
    inTopN: n = 0
  } = {}) {
    super({
      inData: t,
      inColumns: a,
      inConfig: s,
      inTopN: n
    }), this.library = N({
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
  updateData({ inData: t = [] } = {}) {
    return this.library.stateData = x({
      inData: t
    }), this.library.stateData;
  }
}
const j = ({ inColumns: e = [] } = {}) => Array.isArray(e) && e.length > 0, I = () => ({
  tagName: "div",
  attributes: {
    id: "ks-datalists-wrapper"
  },
  children: []
}), O = ({ inGroupedData: e = [], inTags: t } = {}) => {
  const a = e, s = { ...t.option };
  return console.log("optionTagSpec : ", s), a.map((o) => {
    let r = {};
    return r.tagName = "option", r.attributes = { value: o }, r.textContent = o, r;
  });
}, E = ({
  inData: e = {},
  inColumns: t = [],
  inTopN: a = 0,
  inTags: s
} = {}) => t.map((n) => {
  const o = typeof n == "string" ? n : (n == null ? void 0 : n.key) || "", r = (n == null ? void 0 : n.datalistId) || `${o}-datalist`, l = O({
    inGroupedData: e[o],
    inTags: s
  });
  return {
    tagName: "datalist",
    attributes: { id: r },
    children: l
  };
}), L = ({ inChildren: e = [] } = {}) => ({
  tagName: "div",
  attributes: {
    id: "ks-datalists-wrapper"
  },
  children: e
}), M = ({ inData: e = [], inColumns: t = [], inTopN: a = 0, inTags: s } = {}) => {
  if (!j({ inColumns: t }))
    return I();
  const n = E({
    inData: e,
    inColumns: t,
    inTopN: a,
    inTags: s
  });
  return L({ inChildren: n });
}, W = ({ inDataList: e } = {}) => {
  var s, n, o, r;
  const t = e;
  if (!(t != null && t.store)) return null;
  const a = (n = (s = t == null ? void 0 : t.store) == null ? void 0 : s.library) == null ? void 0 : n.distinctData;
  return (r = (o = t == null ? void 0 : t.store) == null ? void 0 : o.library) == null || r.stateData, M({
    inData: a,
    inColumns: t.store.activeColumns,
    inTopN: t.store.topN,
    inTags: t == null ? void 0 : t.tags
  });
}, q = ({ inSpec: e } = {}) => {
  const t = e;
  if (!t || typeof t != "object") return null;
  const a = {}, s = (n) => {
    var r;
    if (!n || typeof n != "object") return;
    const o = (r = n.attributes) == null ? void 0 : r.id;
    if (o && (a[o] = {
      tagName: n.tagName,
      attributes: { ...n.attributes }
    }), Array.isArray(n.children))
      for (const l of n.children)
        s(l);
  };
  return s(t), Object.keys(a).length > 0 ? a : null;
}, B = ({
  inDataList: e,
  inContainerId: t,
  inContainer: a,
  targetContainerId: s
} = {}) => {
  const n = t || s || (e == null ? void 0 : e.containerId);
  return typeof HTMLElement < "u" && a instanceof HTMLElement ? a : n && typeof document < "u" ? document.getElementById(n) : null;
}, f = ({ inSpec: e } = {}) => {
  var s, n, o;
  if (!e || typeof e != "object") return null;
  const t = (o = (n = (s = typeof window < "u" ? window : globalThis) == null ? void 0 : s.ks) == null ? void 0 : n["json-to-dom"]) == null ? void 0 : o.buildSpecElement;
  if (typeof t == "function")
    try {
      const r = t({ inSpec: e });
      return Array.isArray(r) ? r[0] : r;
    } catch {
    }
  if (typeof document > "u") return null;
  const a = document.createElement(e.tagName || "div");
  for (const [r, l] of Object.entries(e.attributes || {}))
    l != null && a.setAttribute(r, String(l));
  e.textContent !== void 0 && e.textContent !== null && (a.textContent = e.textContent);
  for (const r of e.children || []) {
    const l = f({ inSpec: r });
    l && a.appendChild(l);
  }
  return a;
}, K = ({
  inContainer: e,
  inElement: t
} = {}) => {
  !e || !t || (e.innerHTML = "", e.appendChild(t));
}, J = ({
  inDataList: e,
  inContainerId: t,
  inContainer: a,
  targetContainerId: s
} = {}) => {
  if (!e)
    return {
      element: null,
      treeWithIds: null,
      spec: null,
      error: "DataList instance is required"
    };
  const n = B({
    inDataList: e,
    inContainerId: t,
    inContainer: a,
    targetContainerId: s
  }), o = e.buildSpec(), r = q({
    inSpec: o
  }), l = f({
    inSpec: o
  });
  return n && l && K({
    inContainer: n,
    inElement: l
  }), e.element = l, e.controlsTree = r, {
    element: l,
    treeWithIds: r,
    spec: o
  };
}, P = ({ inDataList: e, inContainerId: t, inContainer: a, targetContainerId: s } = {}) => {
  const n = e, l = J({
    inDataList: n,
    inContainerId: t || s,
    inContainer: a
  });
  return l != null && l.element && (n.element = l.element, n.controlsTree = l.treeWithIds), l;
}, Q = ({ inDataList: e } = {}) => {
  const t = e;
  return {
    buildSpec: () => W({ inDataList: t }),
    renderStructure: ({ inContainerId: n, inContainer: o, targetContainerId: r } = {}) => P({
      inDataList: t,
      inContainerId: n,
      inContainer: o,
      targetContainerId: r
    })
  };
}, G = async ({ inDataList: e, inQuery: t = {} } = {}) => {
  const a = e, s = t;
  if (!a) return null;
  if (typeof a.dataProvider == "function")
    try {
      const n = await a.dataProvider(s);
      Array.isArray(n) && (a.store.updateData({ inData: n }), a.renderStructure());
    } catch (n) {
      console.error("[json-to-dom-datalist:actions:load] Error loading data:", n);
    }
  return a.store.stateData;
}, H = ({ inDataList: e, inData: t = [] } = {}) => {
  const a = e, s = t;
  return a ? (a.store.updateData({ inData: s }), a.renderStructure()) : null;
}, S = ({ inDataList: e } = {}) => {
  const t = e;
  return {
    load: async ({ inQuery: n, query: o } = {}) => await G({ inDataList: t, inQuery: n ?? o ?? {} }),
    update: ({ inData: n, data: o } = {}) => H({ inDataList: t, inData: n ?? o ?? [] })
  };
}, h = ({ inData: e = [], inKey: t = "", inTopN: a = 0 } = {}) => {
  const s = e, n = t, o = a;
  if (!Array.isArray(s) || !n)
    return [];
  const r = /* @__PURE__ */ new Map();
  for (const i of s) {
    if (!i || typeof i != "object") continue;
    const c = i[n];
    if (c != null) {
      const u = String(c).trim();
      u !== "" && r.set(u, (r.get(u) || 0) + 1);
    }
  }
  const l = Array.from(r.entries()).map(([i, c]) => ({ value: i, count: c })).sort((i, c) => i.value.localeCompare(c.value, void 0, { sensitivity: "base", numeric: !0 }));
  return o > 0 && Number.isFinite(o) ? l.slice(0, o) : l;
}, $ = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, F = {
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
}, R = {
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
}, U = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, _ = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, V = {
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
}, z = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, X = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Y = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Z = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, tt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, et = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, nt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, at = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, rt = {
  div: $,
  input: F,
  checkbox: R,
  label: U,
  button: _,
  table: V,
  thead: z,
  tbody: X,
  tfoot: Y,
  tr: Z,
  th: tt,
  td: et,
  datalist: nt,
  option: at
};
class d {
  constructor({
    data: t = [],
    columns: a = [],
    config: s = {},
    dataProvider: n = null,
    targetContainerId: o = "datalist-container",
    inData: r,
    inColumns: l,
    inConfig: i,
    inDataProvider: c,
    inTargetContainerId: u
  } = {}) {
    const y = r ?? t, b = l ?? a, g = i ?? s, m = c ?? n, C = u ?? o;
    this.containerId = C, this.dataProvider = m, this.element = null, this.controlsTree = null, this.tags = rt, this.store = new k({
      inData: y,
      inColumns: b,
      inConfig: g
    }), this.methods = Q({ inDataList: this }), this.actions = S({ inDataList: this }), this.spec = this.buildSpec();
  }
  buildSpec() {
    return this.methods.buildSpec();
  }
  render(t = {}) {
    return this.methods.renderStructure(t);
  }
  async load(t = {}) {
    return await this.actions.load(t);
  }
  update(t = {}) {
    return this.actions.update(t);
  }
  getGroupedData({ inKey: t = "", inTopN: a } = {}) {
    const s = t, n = a ?? this.store.topN ?? 0;
    return h({
      inData: this.store.stateData,
      inKey: s,
      inTopN: n
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
d.groupBy = h;
d.layouts = [];
d.themes = [];
const ot = "v7.0.0";
typeof globalThis < "u" && (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom-datalist"] = {
  version: ot,
  DataList: d
});
export {
  d as DataList,
  d as default,
  ot as version
};
