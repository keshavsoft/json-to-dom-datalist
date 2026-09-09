import { DataList } from "../src/v3/index.js";

// ─── Minimal json-to-dom polyfill (so renderDataList fallback works) ─────────
if (!window.ks) window.ks = {};
if (!window.ks["json-to-dom"]) {
  window.ks["json-to-dom"] = {
    buildSpecElement(specInput) {
      const node =
        specInput && typeof specInput === "object" && "inSpec" in specInput
          ? specInput.inSpec
          : specInput;
      if (!node) return null;

      const build = (input) => {
        if (!input) return null;
        if (input instanceof Node) return input;
        if (Array.isArray(input)) return input.map(build).flat().filter(Boolean);
        if (typeof input !== "object") return null;

        const el = document.createElement(input.tagName || "div");

        if (input.attributes) {
          for (const [k, v] of Object.entries(input.attributes)) {
            if (v !== undefined && v !== null) el.setAttribute(k, String(v));
          }
        }
        if (input.textContent !== undefined && input.textContent !== null) {
          el.textContent = input.textContent;
        }
        for (const child of input.children ?? []) {
          const built = build(child);
          if (built) el.appendChild(built);
        }
        return el;
      };
      return build(node);
    },
  };
}

// ─── Sample data ─────────────────────────────────────────────────────────────
export const stockItems = [
  "Shading Net Kgs",
  "ROPE",
  "ROPE",
  "ROPE",
  "Plastic Tray",
  "Plastic Tray",
  "Fertilizer Bag",
  "Fertilizer Bag",
  "Iron Rod",
  "PVC Pipe",
];

export const batchNames = [
  "Rishi-Rs.205/-",
  "Tuf-Rs.170",
  "Tuf-Rs.170",
  "Tuf-Rs.170",
  "PT-Batch-A",
  "PT-Batch-B",
  "FB-2026-A",
  "FB-2026-B",
  "IR-Batch-1",
  "PVC-Batch-X",
];

export const godownNames = [
  "Main Location",
  "Main Location",
  "Store B",
  "Store C",
  "Main Location",
  "Store A",
  "Cold Storage",
  "Cold Storage",
  "Yard",
  "Yard",
];

export const sampleData = stockItems.map((item, i) => ({
  "allinventoryentries.stockitemname": item,
  "allinventoryentries.batchallocations.batchname": batchNames[i],
  "allinventoryentries.batchallocations.godownname": godownNames[i],
  "allinventoryentries.batchallocations.amount": String(
    (100 + i * 47.5).toFixed(2)
  ),
  vchtype: i % 2 === 0 ? "Sales/CA" : "Purchase/CA",
}));

// ─── Column presets ───────────────────────────────────────────────────────────
export const stockColumn = {
  key: "allinventoryentries.stockitemname",
  label: "Stock Item",
  datalistId: "stock-item-datalist",
};
export const batchColumn = {
  key: "allinventoryentries.batchallocations.batchname",
  label: "Batch Name",
  datalistId: "batch-name-datalist",
};
export const godownColumn = {
  key: "allinventoryentries.batchallocations.godownname",
  label: "Godown",
  datalistId: "godown-datalist",
};
export const vchtypeColumn = {
  key: "vchtype",
  label: "Voucher Type",
  datalistId: "vchtype-datalist",
};

// ─── Helper: create a DataList and render ────────────────────────────────────
export const renderExample = ({
  targetId,
  data,
  columns,
  config = {},
  dataProvider = null,
}) => {
  const dl = new DataList({
    inData: data,
    inColumns: columns,
    inConfig: config,
    inDataProvider: dataProvider,
    inTargetContainerId: targetId,
  });
  dl.renderStructure({ inContainerId: targetId });
  return dl;
};

// ─── Helper: dump the hidden <datalist> elements as a readable preview ────────
export const showDatalistPreview = ({ inDataList, inPreviewId }) => {
  const container = document.getElementById(inPreviewId);
  if (!container || !inDataList?.element) return;

  const datalists = inDataList.element.querySelectorAll("datalist");
  if (!datalists.length) {
    container.textContent = "(no datalist elements rendered)";
    return;
  }

  const rows = [];
  for (const dl of datalists) {
    const options = [...dl.querySelectorAll("option")].map((o) => o.value);
    rows.push(`<datalist id="${dl.id}">\n  ${options.map((v) => `<option value="${v}">`).join("\n  ")}\n</datalist>`);
  }
  container.textContent = rows.join("\n\n");
};

export { DataList };
