# json-to-dom-datalist

A lightweight, zero-dependency, config-driven HTML5 `<datalist>` autocomplete generator built on top of `json-to-dom`.

## Start here

- Overview: [docs/pages/overview.html](docs/pages/overview.html)
- Why native `<datalist>`: [docs/pages/why.html](docs/pages/why.html)
- How it works: [docs/pages/how-it-works.html](docs/pages/how-it-works.html)
- Architecture: [docs/pages/architecture.html](docs/pages/architecture.html)
- Version strategy: [docs/pages/versions.html](docs/pages/versions.html)
- Tasks / roadmap: [docs/pages/tasks.html](docs/pages/tasks.html)

## Quick start

```bash
# Instant scaffolding via zero-dependency CLI (always copies src's highest version)
npx json-to-dom-datalist

# Or explore and run tests locally
npm install
npm test
npm run dev
```

Then open the local demo or visit:

- Playground / Docs Hub: https://keshavsoft.github.io/json-to-dom-datalist/docs/index.html
- Repo: https://github.com/keshavsoft/json-to-dom-datalist

## Minimal usage

```javascript
// Import from package root proxy (automatically loads src's highest version)
import { DataList } from "json-to-dom-datalist";
// Or when scaffolded locally via npx json-to-dom-datalist:
// import { DataList } from "./json-to-dom-datalist/index.js";

// 1. Define columns and configuration
const columns = [
  { key: "stockItemName", label: "Stock Item", datalistId: "stock-datalist" },
  { key: "batchName", label: "Batch Name", datalistId: "batch-datalist" }
];

const config = {
  datalist: {
    columns: ["stockItemName", "batchName"],
    topN: 10 // Limit each datalist to the top 10 most frequent entries
  }
};

// 2. Instantiate and render
const dataList = new DataList({
  columns,
  config,
  data: sampleRecords,
  targetContainerId: "datalist-container"
});

await dataList.render();
```

### HTML Input Binding

Simply link any native HTML `<input>` to the generated `<datalist>` ID:

```html
<label for="stock">Stock Item:</label>
<input type="text" id="stock" list="stock-datalist" placeholder="Double-click or type to autocomplete..." />

<label for="batch">Batch:</label>
<input type="text" id="batch" list="batch-datalist" placeholder="Double-click or type to autocomplete..." />

<!-- Container where <datalist> elements are mounted -->
<div id="datalist-container"></div>
```

### Dynamic Real-Time Updates

Call `.update({ inData })` to recalculate distinct frequencies and update the DOM in place without full reloads:

```javascript
dataList.update({
  inData: [
    ...sampleRecords,
    { stockItemName: "Steel Cable 5MM", batchName: "BATCH-Z" }
  ]
});
```

## Scope

This repo is intentionally narrow. It extracts distinct values and occurrence counts from data collections and compiles native HTML5 `<datalist>` options into the DOM via `json-to-dom`. It does not attempt to build custom floating dropdown widgets, heavy popup positioning frameworks, or complex virtualized select lists.

For a deeper explanation, read the linked chapters in the `docs/` folder.
