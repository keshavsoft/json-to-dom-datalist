const g = ({ inData: d = [], inColumns: a = [], inConfig: t = {}, inTopN: n } = {}) => {
  const o = d, s = a, i = t, e = n;
  return {
    originalData: Array.isArray(o) ? typeof structuredClone == "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o)) : [],
    columns: Array.isArray(s) ? s : [],
    config: i || {},
    topN: e
  };
}, C = ({ inColumnsCatalog: d = [], inColumnKeys: a = [] } = {}) => {
  const t = d, n = a;
  if (Array.isArray(n) && n.length > 0) {
    const o = new Map((Array.isArray(t) ? t : []).map((e) => [e.key, e])), s = [], i = [];
    for (const e of n) {
      const r = o.get(e);
      r ? i.push(r) : s.push(e);
    }
    return s.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${s.map((e) => `"${e}"`).join(", ")}] that do not exist in the columns catalog.`
    ), i;
  }
  return Array.isArray(t) ? t : [];
};
class v {
  constructor({ inData: a = [], inColumns: t = [], inConfig: n = {}, inTopN: o } = {}) {
    const s = a, i = t, e = n, r = o;
    this.source = g({
      inData: s,
      inColumns: i,
      inConfig: e,
      inTopN: r
    });
  }
  _buildSource(a) {
    return g(a);
  }
  _resolveActiveColumns(a) {
    return C(a);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const b = ({ inData: d = [] } = {}) => {
  const a = d;
  return Array.isArray(a) ? typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a)) : [];
};
class N extends v {
  constructor({ inData: a = [], inColumns: t = [], inConfig: n = {}, inTopN: o = 100 } = {}) {
    const s = a, i = t, e = n, r = o;
    super({
      inData: s,
      inColumns: i,
      inConfig: e,
      inTopN: r
    }), this.library = this._buildLibrary({
      inSource: this.source
    });
  }
  _buildLibrary({ inSource: a } = {}) {
    var i, e, r, l, c;
    const t = a, n = this._resolveActiveColumns({
      inColumnsCatalog: t == null ? void 0 : t.columns,
      inColumnKeys: ((e = (i = t == null ? void 0 : t.config) == null ? void 0 : i.datalist) == null ? void 0 : e.columns) || ((r = t == null ? void 0 : t.config) == null ? void 0 : r.columns)
    }), o = b({
      inData: t == null ? void 0 : t.originalData
    }), s = ((c = (l = t == null ? void 0 : t.config) == null ? void 0 : l.datalist) == null ? void 0 : c.topN) ?? (t == null ? void 0 : t.topN) ?? 100;
    return {
      activeColumns: n,
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
  updateData({ inData: a = [] } = {}) {
    const t = a;
    return this.library.stateData = Array.isArray(t) ? t : [], this.library.stateData;
  }
}
const h = ({ inData: d = [], inKey: a = "", inTopN: t = 100 } = {}) => {
  const n = d, o = a, s = t;
  if (!Array.isArray(n) || !o) return [];
  const i = /* @__PURE__ */ new Map();
  for (const l of n) {
    if (!l || typeof l != "object") continue;
    const c = l[o];
    if (c != null) {
      const u = String(c).trim();
      u !== "" && i.set(u, (i.get(u) || 0) + 1);
    }
  }
  const e = Array.from(i.entries()).map(([l, c]) => ({ value: l, count: c })).sort((l, c) => l.value.localeCompare(c.value, void 0, { sensitivity: "base", numeric: !0 }));
  return (s > 0 && Number.isFinite(s) ? e.slice(0, s) : e).map(({ value: l, count: c }) => ({
    tagName: "option",
    attributes: {
      value: l,
      label: `${l} (${c})`
    },
    textContent: `${l} (${c})`
  }));
}, A = ({ inData: d = [], inColumns: a = [], inTopN: t = 100 } = {}) => {
  const n = d, o = a, s = t;
  if (!Array.isArray(o) || o.length === 0)
    return {
      tagName: "div",
      attributes: { id: "ks-datalists-wrapper" },
      children: []
    };
  const i = o.map((e) => {
    const r = e.key || "", l = e.datalistId || `${r}-datalist`, c = h({
      inData: n,
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
  const a = d;
  if (!a || typeof document > "u") return null;
  let t = document.getElementById(a.containerId);
  t || (console.warn(`[json-to-dom-renderers:DataList] Target container "#${a.containerId}" was not found in the DOM; auto-created and appended to document.body.`), t = document.createElement("div"), t.id = a.containerId, document.body.appendChild(t));
  const n = A({
    inData: a.store.stateData,
    inColumns: a.store.activeColumns,
    inTopN: a.store.topN
  });
  a.spec = n;
  const o = (e = (i = window.ks) == null ? void 0 : i["json-to-dom"]) == null ? void 0 : e.buildSpecElement;
  let s = null;
  if (typeof o == "function") {
    const r = o({ inSpec: n });
    s = Array.isArray(r) ? r[0] : r;
  }
  if (!s || s.children.length === 0) {
    const r = document.createElement("div");
    r.id = "ks-datalists-wrapper";
    for (const l of a.store.activeColumns) {
      const c = l.key || "", u = l.datalistId || `${c}-datalist`, m = document.createElement("datalist");
      m.id = u;
      const D = h({
        inData: a.store.stateData,
        inKey: c,
        inTopN: a.store.topN
      });
      for (const y of D) {
        const p = document.createElement("option");
        p.value = y.attributes.value, p.label = y.attributes.label, p.textContent = y.textContent, m.appendChild(p);
      }
      r.appendChild(m);
    }
    s = r;
  }
  return a.element = s, t.innerHTML = "", a.element && t.appendChild(a.element), {
    spec: a.spec,
    element: a.element
  };
};
class f {
  constructor({
    data: a = [],
    columns: t = [],
    config: n = {},
    dataProvider: o = null,
    targetContainerId: s = "datalist-container"
  } = {}) {
    const i = a, e = t, r = n, l = o, c = s;
    this.containerId = c, this.dataProvider = l, this.element = null, this.spec = null, this.store = new N({
      inData: i,
      inColumns: e,
      inConfig: r
    });
  }
  async load({ query: a = {} } = {}) {
    const t = a;
    if (!this.dataProvider || typeof this.dataProvider.read != "function")
      return console.warn("[json-to-dom-renderers:DataList] DataList.load called without a valid dataProvider.read implementation"), this.store.stateData;
    try {
      const n = await this.dataProvider.read({ inQuery: t }), o = Array.isArray(n) ? n : (n == null ? void 0 : n.data) || [];
      return this.store.updateData({ inData: o }), this.render(), o;
    } catch (n) {
      return console.error("[json-to-dom-renderers:DataList] Failed to load records via dataProvider.read:", n), this.store.stateData;
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
  update({ data: a = [] } = {}) {
    const t = a;
    return this.store.updateData({ inData: t }), this.render();
  }
}
f.layouts = [];
f.themes = [];
const L = "v2.0.0";
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
