const h = ({ inData: c = [], inColumns: t = [], inConfig: n = {}, inTopN: r } = {}) => {
  const e = c, s = t, o = n, a = r;
  return {
    originalData: Array.isArray(e) ? typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e)) : [],
    columns: Array.isArray(s) ? s : [],
    config: o || {},
    topN: a
  };
}, N = ({ inColumnsCatalog: c = [], inColumnKeys: t = [] } = {}) => {
  const n = c, r = t;
  if (Array.isArray(r) && r.length > 0) {
    const e = new Map((Array.isArray(n) ? n : []).map((a) => [a.key, a])), s = [], o = [];
    for (const a of r) {
      const i = e.get(a);
      i ? o.push(i) : s.push(a);
    }
    return s.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${s.map((a) => `"${a}"`).join(", ")}] that do not exist in the columns catalog.`
    ), o;
  }
  return Array.isArray(n) ? n : [];
};
class v {
  constructor({ inData: t = [], inColumns: n = [], inConfig: r = {}, inTopN: e } = {}) {
    const s = t, o = n, a = r, i = e;
    this.source = h({
      inData: s,
      inColumns: o,
      inConfig: a,
      inTopN: i
    });
  }
  _buildSource(t) {
    return h(t);
  }
  _resolveActiveColumns(t) {
    return N(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
const T = ({ inData: c = [] } = {}) => {
  const t = c;
  return Array.isArray(t) ? typeof structuredClone == "function" ? structuredClone(t) : JSON.parse(JSON.stringify(t)) : [];
};
class S extends v {
  constructor({ inData: t = [], inColumns: n = [], inConfig: r = {}, inTopN: e = 0 } = {}) {
    const s = t, o = n, a = r, i = e;
    super({
      inData: s,
      inColumns: o,
      inConfig: a,
      inTopN: i
    }), this.library = this._buildLibrary({
      inSource: this.source
    });
  }
  _buildLibrary({ inSource: t } = {}) {
    var o, a, i, l, u;
    const n = t, r = this._resolveActiveColumns({
      inColumnsCatalog: n == null ? void 0 : n.columns,
      inColumnKeys: ((a = (o = n == null ? void 0 : n.config) == null ? void 0 : o.datalist) == null ? void 0 : a.columns) || ((i = n == null ? void 0 : n.config) == null ? void 0 : i.columns)
    }), e = T({
      inData: n == null ? void 0 : n.originalData
    }), s = ((u = (l = n == null ? void 0 : n.config) == null ? void 0 : l.datalist) == null ? void 0 : u.topN) ?? (n == null ? void 0 : n.topN) ?? 0;
    return {
      activeColumns: r,
      stateData: e,
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
  updateData({ inData: t = [] } = {}) {
    const n = t;
    return this.library.stateData = Array.isArray(n) ? n : [], this.library.stateData;
  }
}
const y = ({ inSpec: c } = {}) => {
  var i, l, u;
  const t = c;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const d = t.map((p) => y({ inSpec: p })).filter(Boolean);
    return d.length > 0 ? d : null;
  }
  const r = (Array.isArray(t.children) ? t.children : []).map((d) => y({ inSpec: d })).filter(Boolean), e = ((i = t.attributes) == null ? void 0 : i.id) || t.id, s = !!e, o = r.length > 0;
  if (!s && !o)
    return null;
  const a = {
    tagName: t.tagName
  };
  return e && (a.id = e), (l = t.attributes) != null && l.name && (a.name = t.attributes.name), (u = t.attributes) != null && u.type && (a.type = t.attributes.type), t.attributes && (a.attributes = t.attributes), r.length > 0 && (a.children = r), a;
}, m = ({ inData: c = [], inKey: t = "", inTopN: n = 0 } = {}) => {
  const r = c, e = t, s = n;
  if (!Array.isArray(r) || !e)
    return [];
  const o = /* @__PURE__ */ new Map();
  for (const i of r) {
    if (!i || typeof i != "object") continue;
    const l = i[e];
    if (l != null) {
      const u = String(l).trim();
      u !== "" && o.set(u, (o.get(u) || 0) + 1);
    }
  }
  const a = Array.from(o.entries()).map(([i, l]) => ({ value: i, count: l })).sort((i, l) => i.value.localeCompare(l.value, void 0, { sensitivity: "base", numeric: !0 }));
  return s > 0 && Number.isFinite(s) ? a.slice(0, s) : a;
}, I = ({ inData: c = [], inKey: t = "", inTopN: n = 0, inGroupedData: r } = {}) => {
  const e = c, s = t, o = n, a = r;
  return (Array.isArray(a) ? a : m({ inData: e, inKey: s, inTopN: o })).map(({ value: l, count: u }) => ({
    tagName: "option",
    attributes: {
      value: l,
      label: `${l} (${u})`
    },
    textContent: `${l} (${u})`
  }));
}, w = ({ inData: c = [], inColumns: t = [], inTopN: n = 0 } = {}) => {
  const r = c, e = t, s = n;
  if (!Array.isArray(e) || e.length === 0)
    return {
      tagName: "div",
      attributes: { id: "ks-datalists-wrapper" },
      children: []
    };
  const o = e.map((a) => {
    const i = a.key || "", l = a.datalistId || `${i}-datalist`, u = I({
      inData: r,
      inKey: i,
      inTopN: s
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
}, L = ({ inDataList: c } = {}) => {
  const t = c;
  return t != null && t.store ? w({
    inData: t.store.stateData,
    inColumns: t.store.activeColumns,
    inTopN: t.store.topN
  }) : null;
}, g = ({ inSpec: c } = {}) => {
  const t = c;
  if (!t || typeof t != "object") return null;
  const n = document.createElement(t.tagName || "div");
  if (t.attributes && typeof t.attributes == "object")
    for (const [r, e] of Object.entries(t.attributes))
      e != null && n.setAttribute(r, String(e));
  if (t.textContent !== void 0 && t.textContent !== null && (n.textContent = t.textContent), Array.isArray(t.children))
    for (const r of t.children) {
      const e = g({ inSpec: r });
      e && n.appendChild(e);
    }
  return n;
}, j = ({ inDataList: c, inContainerId: t, inContainer: n, targetContainerId: r } = {}) => {
  const e = c, s = n, o = t || r || (e == null ? void 0 : e.containerId);
  return typeof HTMLElement < "u" && s instanceof HTMLElement ? s : o && typeof document < "u" ? document.getElementById(o) : null;
}, k = ({ inContainer: c, inElement: t } = {}) => {
  const n = c, r = t;
  !n || !r || (n.innerHTML = "", n.appendChild(r));
}, C = ({ inDataList: c, inContainerId: t, inContainer: n, targetContainerId: r } = {}) => {
  var p;
  const e = c, s = t, o = n, a = r, i = j({
    inDataList: e,
    inContainerId: s,
    inContainer: o,
    targetContainerId: a
  });
  if (!i)
    return (p = e == null ? void 0 : e.config) != null && p.debug && console.warn(`[json-to-dom-datalist:renderStructure] Target container "${s || a || (e == null ? void 0 : e.containerId)}" not found.`), { element: null, treeWithIds: null, spec: null, error: "Container not found" };
  const l = e.buildSpec(), u = y({ inSpec: l }), d = g({ inSpec: l });
  return k({ inContainer: i, inElement: d }), e.element = d, e.controlsTree = u, {
    element: d,
    treeWithIds: u,
    spec: l
  };
}, K = async ({ inDataList: c, inContainerId: t, inContainer: n, targetContainerId: r } = {}) => {
  const e = c, s = t || r, o = n;
  return e != null && e.dataProvider && (!e.store.stateData || e.store.stateData.length === 0) && await e.actions.load(), C({
    inDataList: e,
    inContainerId: s,
    inContainer: o
  });
}, x = ({ inDataList: c } = {}) => {
  const t = c;
  return {
    buildSpec: () => L({ inDataList: t }),
    renderStructure: ({ inContainerId: s, inContainer: o, targetContainerId: a } = {}) => {
      const i = C({
        inDataList: t,
        inContainerId: s,
        inContainer: o,
        targetContainerId: a
      });
      return i != null && i.element && (t.element = i.element, t.controlsTree = i.treeWithIds), i;
    },
    render: async ({ inContainerId: s, inContainer: o, targetContainerId: a } = {}) => {
      const i = await K({
        inDataList: t,
        inContainerId: s,
        inContainer: o,
        targetContainerId: a
      });
      return i != null && i.element && (t.element = i.element, t.controlsTree = i.treeWithIds), i;
    }
  };
}, B = async ({ inDataList: c, inQuery: t = {} } = {}) => {
  var e, s;
  const n = c, r = t;
  if (!(n != null && n.dataProvider) || typeof n.dataProvider.read != "function")
    return ((e = n == null ? void 0 : n.store) == null ? void 0 : e.stateData) || [];
  try {
    const o = await n.dataProvider.read({ inQuery: r }), a = Array.isArray(o) ? o : (o == null ? void 0 : o.data) || [];
    return n.store.updateData({ inData: a }), n.renderStructure(), a;
  } catch (o) {
    return console.error("[json-to-dom-datalist:load] Failed to load records via dataProvider.read:", o), ((s = n == null ? void 0 : n.store) == null ? void 0 : s.stateData) || [];
  }
}, M = ({ inDataList: c, inData: t = [] } = {}) => {
  const n = c, r = t;
  return n.store.updateData({ inData: r }), n.renderStructure();
}, $ = ({ inDataList: c } = {}) => {
  const t = c;
  return {
    load: async ({ inQuery: e, query: s } = {}) => await B({ inDataList: t, inQuery: e ?? s ?? {} }),
    update: ({ inData: e, data: s } = {}) => M({ inDataList: t, inData: e ?? s ?? [] })
  };
};
class f {
  constructor({
    data: t = [],
    columns: n = [],
    config: r = {},
    dataProvider: e = null,
    targetContainerId: s = "datalist-container",
    inData: o,
    inColumns: a,
    inConfig: i,
    inDataProvider: l,
    inTargetContainerId: u
  } = {}) {
    const d = o || t, p = a || n, D = i || r, b = l || e, A = u || s;
    this.containerId = A, this.dataProvider = b, this.element = null, this.controlsTree = null, this.store = new S({
      inData: d,
      inColumns: p,
      inConfig: D
    }), this.methods = x({ inDataList: this }), this.actions = $({ inDataList: this }), this.spec = this.buildSpec();
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
  getGroupedData({ inKey: t = "", inTopN: n } = {}) {
    const r = t, e = n ?? this.store.topN ?? 0;
    return m({
      inData: this.store.stateData,
      inKey: r,
      inTopN: e
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
f.groupBy = m;
f.layouts = [];
f.themes = [];
const E = "v2.0.0";
typeof globalThis < "u" && (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom-datalist"] = {
  version: E,
  DataList: f
});
export {
  f as DataList,
  f as default,
  E as version
};
