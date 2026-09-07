const g = ({ inData: d = [], inColumns: n = [], inConfig: t = {}, inTopN: a } = {}) => {
  const o = d, s = n, i = t, e = a;
  return {
    originalData: Array.isArray(o) ? typeof structuredClone == "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o)) : [],
    columns: Array.isArray(s) ? s : [],
    config: i || {},
    topN: e
  };
}, C = ({ inColumnsCatalog: d = [], inColumnKeys: n = [] } = {}) => {
  const t = d, a = n;
  if (Array.isArray(a) && a.length > 0) {
    const o = new Map((Array.isArray(t) ? t : []).map((e) => [e.key, e])), s = [], i = [];
    for (const e of a) {
      const r = o.get(e);
      r ? i.push(r) : s.push(e);
    }
    return s.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${s.map((e) => `"${e}"`).join(", ")}] that do not exist in the columns catalog.`
    ), i;
  }
  return Array.isArray(t) ? t : [];
};
class b {
  constructor({ inData: n = [], inColumns: t = [], inConfig: a = {}, inTopN: o } = {}) {
    const s = n, i = t, e = a, r = o;
    this.source = g({
      inData: s,
      inColumns: i,
      inConfig: e,
      inTopN: r
    });
  }
  _buildSource(n) {
    return g(n);
  }
  _resolveActiveColumns(n) {
    return C(n);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const v = ({ inData: d = [] } = {}) => {
  const n = d;
  return Array.isArray(n) ? typeof structuredClone == "function" ? structuredClone(n) : JSON.parse(JSON.stringify(n)) : [];
};
class N extends b {
  constructor({ inData: n = [], inColumns: t = [], inConfig: a = {}, inTopN: o = 100 } = {}) {
    const s = n, i = t, e = a, r = o;
    super({
      inData: s,
      inColumns: i,
      inConfig: e,
      inTopN: r
    }), this.library = this._buildLibrary({
      inSource: this.source
    });
  }
  _buildLibrary({ inSource: n } = {}) {
    var i, e, r, l, c;
    const t = n, a = this._resolveActiveColumns({
      inColumnsCatalog: t == null ? void 0 : t.columns,
      inColumnKeys: ((e = (i = t == null ? void 0 : t.config) == null ? void 0 : i.datalist) == null ? void 0 : e.columns) || ((r = t == null ? void 0 : t.config) == null ? void 0 : r.columns)
    }), o = v({
      inData: t == null ? void 0 : t.originalData
    }), s = ((c = (l = t == null ? void 0 : t.config) == null ? void 0 : l.datalist) == null ? void 0 : c.topN) ?? (t == null ? void 0 : t.topN) ?? 100;
    return {
      activeColumns: a,
      stateData: o,
      topN: s
    };
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
  updateData({ inData: n = [] } = {}) {
    const t = n;
    return this.library.stateData = Array.isArray(t) ? t : [], this.library.stateData;
  }
}
const h = ({ inData: d = [], inKey: n = "", inTopN: t = 100 } = {}) => {
  const a = d, o = n, s = t;
  if (!Array.isArray(a) || !o) return [];
  const i = /* @__PURE__ */ new Map();
  for (const l of a) {
    if (!l || typeof l != "object") continue;
    const c = l[o];
    if (c != null) {
      const u = String(c).trim();
      u !== "" && i.set(u, (i.get(u) || 0) + 1);
    }
  }
  const e = Array.from(i.entries()).map(([l, c]) => ({ value: l, count: c })).sort((l, c) => c.count - l.count);
  return (s > 0 && Number.isFinite(s) ? e.slice(0, s) : e).map(({ value: l, count: c }) => ({
    tagName: "option",
    attributes: {
      value: l,
      label: `${l} (${c})`
    },
    textContent: `${l} (${c})`
  }));
}, A = ({ inData: d = [], inColumns: n = [], inTopN: t = 100 } = {}) => {
  const a = d, o = n, s = t;
  if (!Array.isArray(o) || o.length === 0)
    return {
      tagName: "div",
      attributes: { id: "ks-datalists-wrapper" },
      children: []
    };
  const i = o.map((e) => {
    const r = e.key || "", l = e.datalistId || `${r}-datalist`, c = h({
      inData: a,
      inKey: r,
      inTopN: s
    });
    return {
      tagName: "datalist",
      attributes: {
        id: l
      },
      children: c
    };
  });
  return {
    tagName: "div",
    attributes: {
      id: "ks-datalists-wrapper"
    },
    children: i
  };
}, w = ({ inDataList: d } = {}) => {
  var i, e;
  const n = d;
  if (!n || typeof document > "u") return null;
  let t = document.getElementById(n.containerId);
  t || (console.warn(`[json-to-dom-renderers:DataList] Target container "#${n.containerId}" was not found in the DOM; auto-created and appended to document.body.`), t = document.createElement("div"), t.id = n.containerId, document.body.appendChild(t));
  const a = A({
    inData: n.store.stateData,
    inColumns: n.store.activeColumns,
    inTopN: n.store.topN
  });
  n.spec = a;
  const o = (e = (i = window.ks) == null ? void 0 : i["json-to-dom"]) == null ? void 0 : e.buildSpecElement;
  let s = null;
  if (typeof o == "function") {
    const r = o({ inSpec: a });
    s = Array.isArray(r) ? r[0] : r;
  }
  if (!s || s.children.length === 0) {
    const r = document.createElement("div");
    r.id = "ks-datalists-wrapper";
    for (const l of n.store.activeColumns) {
      const c = l.key || "", u = l.datalistId || `${c}-datalist`, m = document.createElement("datalist");
      m.id = u;
      const D = h({
        inData: n.store.stateData,
        inKey: c,
        inTopN: n.store.topN
      });
      for (const y of D) {
        const p = document.createElement("option");
        p.value = y.attributes.value, p.label = y.attributes.label, p.textContent = y.textContent, m.appendChild(p);
      }
      r.appendChild(m);
    }
    s = r;
  }
  return n.element = s, t.innerHTML = "", n.element && t.appendChild(n.element), {
    spec: n.spec,
    element: n.element
  };
};
class f {
  constructor({
    data: n = [],
    columns: t = [],
    config: a = {},
    dataProvider: o = null,
    targetContainerId: s = "datalist-container"
  } = {}) {
    const i = n, e = t, r = a, l = o, c = s;
    this.containerId = c, this.dataProvider = l, this.element = null, this.spec = null, this.store = new N({
      inData: i,
      inColumns: e,
      inConfig: r
    });
  }
  async load({ query: n = {} } = {}) {
    const t = n;
    if (!this.dataProvider || typeof this.dataProvider.read != "function")
      return console.warn("[json-to-dom-renderers:DataList] DataList.load called without a valid dataProvider.read implementation"), this.store.stateData;
    try {
      const a = await this.dataProvider.read({ inQuery: t }), o = Array.isArray(a) ? a : (a == null ? void 0 : a.data) || [];
      return this.store.updateData({ inData: o }), this.render(), o;
    } catch (a) {
      return console.error("[json-to-dom-renderers:DataList] Failed to load records via dataProvider.read:", a), this.store.stateData;
    }
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
  render() {
    return w({ inDataList: this });
  }
  update({ data: n = [] } = {}) {
    const t = n;
    return this.store.updateData({ inData: t }), this.render();
  }
}
f.layouts = [];
f.themes = [];
const L = "v1.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-datalist"] = {
  version: L,
  DataList: f
};
export {
  f as DataList,
  f as default,
  L as version
};
