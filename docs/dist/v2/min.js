const y = ({ inData: c = [], inColumns: t = [], inConfig: e = {}, inTopN: s } = {}) => {
  const n = c, a = t, o = e, r = s;
  return {
    originalData: Array.isArray(n) ? typeof structuredClone == "function" ? structuredClone(n) : JSON.parse(JSON.stringify(n)) : [],
    columns: Array.isArray(a) ? a : [],
    config: o || {},
    topN: r
  };
}, A = ({ inColumnsCatalog: c = [], inColumnKeys: t = [] } = {}) => {
  const e = c, s = t;
  if (Array.isArray(s) && s.length > 0) {
    const n = new Map((Array.isArray(e) ? e : []).map((r) => [r.key, r])), a = [], o = [];
    for (const r of s) {
      const i = n.get(r);
      i ? o.push(i) : a.push(r);
    }
    return a.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${a.map((r) => `"${r}"`).join(", ")}] that do not exist in the columns catalog.`
    ), o;
  }
  return Array.isArray(e) ? e : [];
};
class v {
  constructor({ inData: t = [], inColumns: e = [], inConfig: s = {}, inTopN: n } = {}) {
    const a = t, o = e, r = s, i = n;
    this.source = y({
      inData: a,
      inColumns: o,
      inConfig: r,
      inTopN: i
    });
  }
  _buildSource(t) {
    return y(t);
  }
  _resolveActiveColumns(t) {
    return A(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const N = ({ inData: c = [] } = {}) => {
  const t = c;
  return Array.isArray(t) ? typeof structuredClone == "function" ? structuredClone(t) : JSON.parse(JSON.stringify(t)) : [];
};
class S extends v {
  constructor({ inData: t = [], inColumns: e = [], inConfig: s = {}, inTopN: n = 0 } = {}) {
    const a = t, o = e, r = s, i = n;
    super({
      inData: a,
      inColumns: o,
      inConfig: r,
      inTopN: i
    }), this.library = this._buildLibrary({
      inSource: this.source
    });
  }
  _buildLibrary({ inSource: t } = {}) {
    var o, r, i, l, u;
    const e = t, s = this._resolveActiveColumns({
      inColumnsCatalog: e == null ? void 0 : e.columns,
      inColumnKeys: ((r = (o = e == null ? void 0 : e.config) == null ? void 0 : o.datalist) == null ? void 0 : r.columns) || ((i = e == null ? void 0 : e.config) == null ? void 0 : i.columns)
    }), n = N({
      inData: e == null ? void 0 : e.originalData
    }), a = ((u = (l = e == null ? void 0 : e.config) == null ? void 0 : l.datalist) == null ? void 0 : u.topN) ?? (e == null ? void 0 : e.topN) ?? 0;
    return {
      activeColumns: s,
      stateData: n,
      topN: a
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
  updateData({ inData: t = [] } = {}) {
    const e = t;
    return this.library.stateData = Array.isArray(e) ? e : [], this.library.stateData;
  }
}
const w = ({ inData: c = [], inKey: t = "", inTopN: e = 0 } = {}) => {
  const s = c, n = t, a = e;
  if (!Array.isArray(s) || !n) return [];
  const o = /* @__PURE__ */ new Map();
  for (const l of s) {
    if (!l || typeof l != "object") continue;
    const u = l[n];
    if (u != null) {
      const d = String(u).trim();
      d !== "" && o.set(d, (o.get(d) || 0) + 1);
    }
  }
  const r = Array.from(o.entries()).map(([l, u]) => ({ value: l, count: u })).sort((l, u) => l.value.localeCompare(u.value, void 0, { sensitivity: "base", numeric: !0 }));
  return (a > 0 && Number.isFinite(a) ? r.slice(0, a) : r).map(({ value: l, count: u }) => ({
    tagName: "option",
    attributes: {
      value: l,
      label: `${l} (${u})`
    },
    textContent: `${l} (${u})`
  }));
}, T = ({ inData: c = [], inColumns: t = [], inTopN: e = 0 } = {}) => {
  const s = c, n = t, a = e;
  if (!Array.isArray(n) || n.length === 0)
    return {
      tagName: "div",
      attributes: { id: "ks-datalists-wrapper" },
      children: []
    };
  const o = n.map((r) => {
    const i = r.key || "", l = r.datalistId || `${i}-datalist`, u = w({
      inData: s,
      inKey: i,
      inTopN: a
    });
    return {
      tagName: "datalist",
      attributes: {
        id: l
      },
      children: u
    };
  });
  return {
    tagName: "div",
    attributes: {
      id: "ks-datalists-wrapper"
    },
    children: o
  };
}, I = ({ inDataList: c } = {}) => {
  const t = c;
  return t != null && t.store ? T({
    inData: t.store.stateData,
    inColumns: t.store.activeColumns,
    inTopN: t.store.topN
  }) : null;
}, m = ({ inSpec: c } = {}) => {
  var i, l, u;
  const t = c;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const d = t.map((p) => m({ inSpec: p })).filter(Boolean);
    return d.length > 0 ? d : null;
  }
  const s = (Array.isArray(t.children) ? t.children : []).map((d) => m({ inSpec: d })).filter(Boolean), n = ((i = t.attributes) == null ? void 0 : i.id) || t.id, a = !!n, o = s.length > 0;
  if (!a && !o)
    return null;
  const r = {
    tagName: t.tagName
  };
  return n && (r.id = n), (l = t.attributes) != null && l.name && (r.name = t.attributes.name), (u = t.attributes) != null && u.type && (r.type = t.attributes.type), t.attributes && (r.attributes = t.attributes), s.length > 0 && (r.children = s), r;
}, h = ({ inSpec: c } = {}) => {
  const t = c;
  if (!t || typeof t != "object") return null;
  const e = document.createElement(t.tagName || "div");
  if (t.attributes && typeof t.attributes == "object")
    for (const [s, n] of Object.entries(t.attributes))
      n != null && e.setAttribute(s, String(n));
  if (t.textContent !== void 0 && t.textContent !== null && (e.textContent = t.textContent), Array.isArray(t.children))
    for (const s of t.children) {
      const n = h({ inSpec: s });
      n && e.appendChild(n);
    }
  return e;
}, g = ({ inDataList: c, inContainerId: t, inContainer: e, targetContainerId: s } = {}) => {
  const n = c, a = t || s || (n == null ? void 0 : n.containerId), r = e || (a ? document.getElementById(a) : null);
  if (!r)
    return console.warn(`[json-to-dom-datalist:renderStructure] Target container "${a}" not found.`), null;
  const i = n.buildSpec(), { spec: l, treeWithIds: u } = m({ inSpec: i });
  r.innerHTML = "";
  const d = h({ inSpec: l });
  return d && r.appendChild(d), { element: d, treeWithIds: u, spec: l };
}, L = async ({ inDataList: c, inContainerId: t, inContainer: e, targetContainerId: s } = {}) => {
  const n = c, a = t || s, o = e;
  return n != null && n.dataProvider && (!n.store.stateData || n.store.stateData.length === 0) && await n.actions.load(), g({
    inDataList: n,
    inContainerId: a,
    inContainer: o
  });
}, j = ({ inDataList: c } = {}) => {
  const t = c;
  return {
    buildSpec: () => I({ inDataList: t }),
    renderStructure: ({ inContainerId: a, inContainer: o, targetContainerId: r } = {}) => {
      const i = g({
        inDataList: t,
        inContainerId: a,
        inContainer: o,
        targetContainerId: r
      });
      return i != null && i.element && (t.element = i.element, t.controlsTree = i.treeWithIds), i;
    },
    render: async ({ inContainerId: a, inContainer: o, targetContainerId: r } = {}) => {
      const i = await L({
        inDataList: t,
        inContainerId: a,
        inContainer: o,
        targetContainerId: r
      });
      return i != null && i.element && (t.element = i.element, t.controlsTree = i.treeWithIds), i;
    }
  };
}, k = async ({ inDataList: c, inQuery: t = {} } = {}) => {
  var n, a;
  const e = c, s = t;
  if (!(e != null && e.dataProvider) || typeof e.dataProvider.read != "function")
    return ((n = e == null ? void 0 : e.store) == null ? void 0 : n.stateData) || [];
  try {
    const o = await e.dataProvider.read({ inQuery: s }), r = Array.isArray(o) ? o : (o == null ? void 0 : o.data) || [];
    return e.store.updateData({ inData: r }), e.renderStructure(), r;
  } catch (o) {
    return console.error("[json-to-dom-datalist:load] Failed to load records via dataProvider.read:", o), ((a = e == null ? void 0 : e.store) == null ? void 0 : a.stateData) || [];
  }
}, x = ({ inDataList: c, inData: t = [] } = {}) => {
  const e = c, s = t;
  return e.store.updateData({ inData: s }), e.renderStructure();
}, $ = ({ inDataList: c } = {}) => {
  const t = c;
  return {
    load: async ({ inQuery: n, query: a } = {}) => await k({ inDataList: t, inQuery: n ?? a ?? {} }),
    update: ({ inData: n, data: a } = {}) => x({ inDataList: t, inData: n ?? a ?? [] })
  };
};
class f {
  constructor({
    data: t = [],
    columns: e = [],
    config: s = {},
    dataProvider: n = null,
    targetContainerId: a = "datalist-container",
    inData: o,
    inColumns: r,
    inConfig: i,
    inDataProvider: l,
    inTargetContainerId: u
  } = {}) {
    const d = o || t, p = r || e, C = i || s, D = l || n, b = u || a;
    this.containerId = b, this.dataProvider = D, this.element = null, this.controlsTree = null, this.store = new S({
      inData: d,
      inColumns: p,
      inConfig: C
    }), this.methods = j({ inDataList: this }), this.actions = $({ inDataList: this }), this.spec = this.buildSpec();
  }
  buildSpec() {
    return this.methods.buildSpec();
  }
  renderStructure(t = {}) {
    return this.methods.renderStructure(t);
  }
  async render(t = {}) {
    return await this.methods.render(t);
  }
  async load(t = {}) {
    return await this.actions.load(t);
  }
  update(t = {}) {
    return this.actions.update(t);
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
f.layouts = [];
f.themes = [];
const P = "v2.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-datalist"] = {
  version: P,
  DataList: f
};
export {
  f as DataList,
  f as default,
  P as version
};
