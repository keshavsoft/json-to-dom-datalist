# json-to-dom-datalist

[![npm version](https://img.shields.io/badge/version-1.2.2-blue.svg)](https://www.npmjs.com/package/json-to-dom-datalist)
[![Engine Highest](https://img.shields.io/badge/engine-v2%20(src's%20highest)-brightgreen.svg)](https://keshavsoft.github.io/json-to-dom-datalist/pages/versions.html)
[![Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](#)
[![Tests](https://img.shields.io/badge/tests-17%20passing-success.svg)](#testing)
[![Live Demo](https://img.shields.io/badge/demo-GitHub%20Pages-informational.svg)](https://keshavsoft.github.io/json-to-dom-datalist/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lightweight, zero-dependency, config-driven HTML5 `<datalist>` autocomplete generator built on top of `json-to-dom`.

---

### 🚀 Live Interactive Hub & Playground

> **Explore the interactive demo with real-time DOM inspection**:  
> 👉 **[https://keshavsoft.github.io/json-to-dom-datalist/](https://keshavsoft.github.io/json-to-dom-datalist/)**

---

## Documentation & Learning Guides

Explore the documentation either as live responsive web pages or directly inside GitHub as markdown:

| Chapter / Guide | 🌐 Live Page (GitHub Pages) | 📖 GitHub Markdown | Summary |
| :--- | :--- | :--- | :--- |
| **Overview** | [Live Overview](https://keshavsoft.github.io/json-to-dom-datalist/pages/overview.html) | [docs/markdown/overview.md](docs/markdown/overview.md) | Features, capabilities, and architectural scope |
| **Why Native `<datalist>`** | [Live Why Guide](https://keshavsoft.github.io/json-to-dom-datalist/pages/why.html) | [docs/markdown/why.md](docs/markdown/why.md) | Why native autocompletion beats bloated 200KB dropdown libraries |
| **How It Works** | [Live Pipeline](https://keshavsoft.github.io/json-to-dom-datalist/pages/how-it-works.html) | [docs/markdown/how-it-works.md](docs/markdown/how-it-works.md) | 5-stage pipeline from records to DOM autocomplete mounting |
| **Architecture** | [Live Architecture](https://keshavsoft.github.io/json-to-dom-datalist/pages/architecture.html) | [docs/markdown/architecture.md](docs/markdown/architecture.md) | Decoupled state store, builders, actions, and KeshavSoft conventions |
| **Version Strategy** | [Live Versions](https://keshavsoft.github.io/json-to-dom-datalist/pages/versions.html) | [docs/markdown/versions.md](docs/markdown/versions.md) | Non-breaking versioned evolution & auto highest version resolution |
| **Tasks & Roadmap** | [Live Roadmap](https://keshavsoft.github.io/json-to-dom-datalist/pages/tasks.html) | [docs/markdown/tasks.md](docs/markdown/tasks.md) | Completed milestones and upcoming roadmap features |
| **Playground & DOM Inspector** | [Live Playground](https://keshavsoft.github.io/json-to-dom-datalist/) | [docs/index.html](docs/index.html) | Interactive testbed with live inputs and generated `<datalist>` DOM inspector |

---

## Why Choose json-to-dom-datalist?

- ⚡ **Zero External CSS/JS Dependencies**: Uses browser-native HTML5 `<datalist>` autocomplete popup. No Popper.js, no floating-ui, no CSS styling conflicts.
- 📱 **Mobile & Keyboard First**: Native integration with virtual keyboards on iOS and Android without virtual keyboard collision or z-index clipping bugs.
- 📊 **Distinct Frequency Aggregation**: Automatically calculates distinct values and occurrence counts (e.g. `ROPE (3)`), giving users instant insight into frequent selections.
- 🔄 **Real-Time Dynamic Mutations**: Call `.update({ inData })` to recalculate frequencies and update mounted `<datalist>` options in place without full page reloads.
- 🧩 **Clean DOM Separation**: Datalist option elements live in an isolated mounting container while normal `<input>` elements cleanly reference them by ID (`list="my-datalist"`).
- 📦 **Instant Scaffolding via NPX**: Copy the latest engine version directly into any project with zero configuration.

---

## Installation & Quick Scaffolding

### Option 1: Instant Zero-Dependency Scaffolding via NPX (Recommended)

Copy the engine directly into your project codebase (automatically selects **src's highest version**, currently `v2`):

```bash
# Instant scaffolding into ./json-to-dom-datalist
npx json-to-dom-datalist

# Or specify a custom target directory:
npx json-to-dom-datalist ./src/components/datalist

# Or target a specific version if needed:
npx json-to-dom-datalist ./src/components/datalist --version-target=v2
```

### Option 2: Install via NPM

```bash
npm install json-to-dom-datalist
```

---

## Quick Start Guide

### 1. Define Columns and Configuration

```javascript
import { DataList } from "json-to-dom-datalist";
// Or when scaffolded locally:
// import { DataList } from "./json-to-dom-datalist/index.js";

// Column schema
const columns = [
  { key: "stockItemName", label: "Stock Item", datalistId: "stock-datalist" },
  { key: "batchName", label: "Batch Name", datalistId: "batch-datalist" }
];

// Configuration
const config = {
  datalist: {
    columns: ["stockItemName", "batchName"],
    topN: 10 // Limit options to top 10 most frequent entries
  }
};
```

### 2. Instantiate and Render

```javascript
const sampleRecords = [
  { stockItemName: "ROPE", batchName: "BATCH-A" },
  { stockItemName: "ROPE", batchName: "BATCH-B" },
  { stockItemName: "ROPE", batchName: "BATCH-A" },
  { stockItemName: "Shading Net Kgs", batchName: "BATCH-C" }
];

const dataList = new DataList({
  columns,
  config,
  data: sampleRecords,
  targetContainerId: "datalist-container"
});

// Compiles declarative specs and mounts <datalist> elements into the DOM
await dataList.render();
```

### 3. Bind to HTML `<input>` Elements

Simply point any standard native HTML `<input>` to the generated `<datalist>` ID using the native `list` attribute:

```html
<!-- Input 1: Bound to stock-datalist -->
<label for="stock">Stock Item:</label>
<input 
  type="text" 
  id="stock" 
  list="stock-datalist" 
  placeholder="Double-click or type to autocomplete..." 
/>

<!-- Input 2: Bound to batch-datalist -->
<label for="batch">Batch Name:</label>
<input 
  type="text" 
  id="batch" 
  list="batch-datalist" 
  placeholder="Double-click or type to autocomplete..." 
/>

<!-- Invisible container where generated <datalist> elements are mounted -->
<div id="datalist-container"></div>
```

### 4. Dynamic Real-Time Updates

Whenever records are added, deleted, or filtered, call `.update({ inData })` to re-aggregate distinct frequencies and mutate the DOM in place:

```javascript
dataList.update({
  inData: [
    ...sampleRecords,
    { stockItemName: "SUPER HEAVY WIRE ROPE 50MM", batchName: "BATCH-2026" }
  ]
});
```

---

## Generated DOM Inspection

`json-to-dom-datalist` produces clean, W3C-valid HTML:

```html
<div id="datalist-container">
  <div id="ks-datalists-wrapper">
    <datalist id="stock-datalist">
      <option value="ROPE">ROPE (3)</option>
      <option value="Shading Net Kgs">Shading Net Kgs (1)</option>
    </datalist>
    <datalist id="batch-datalist">
      <option value="BATCH-A">BATCH-A (2)</option>
      <option value="BATCH-B">BATCH-B (1)</option>
      <option value="BATCH-C">BATCH-C (1)</option>
    </datalist>
  </div>
</div>
```

---

## Architecture & Conventions

### Layer Responsibilities (`src/v2/`)

```
src/
├── index.js                     # Root proxy resolving src's highest version (v2)
└── v2/
    ├── common/                  # Reusable utilities
    │   ├── SourceStore.js       # Base catalog & store state
    │   ├── cloneData.js         # Immutable cloning utility
    │   ├── groupBy.js           # Distinct aggregation & frequency counter
    │   └── pruneTreeWithIds.js  # Control tree extraction
    ├── datalist/                # Core DataList orchestration
    │   ├── DataList.js          # Master class
    │   ├── actions/             # load, update actions
    │   ├── methods/             # buildSpec, renderStructure methods
    │   ├── datalistStore/       # DataListStore.js state manager
    │   ├── datalistBuilder/     # Declarative JSON tree builders
    │   │   ├── buildDataList.js # Assembles datalist wrappers
    │   │   └── parts/buildOptions.js # Assembles option specs with counts
    │   └── render/              # DOM attachment
    └── index.js                 # Universal globalThis export
```

### KeshavSoft Parameter Convention

Every internal method and function adheres to the strict `{ in... }` argument contract and immediately maps to `local...` variables:

```javascript
const buildOptions = ({
  inData = [],
  inKey = "",
  inTopN = 0,
  inGroupedData
} = {}) => {
  const localData = inData;
  const localKey = inKey;
  const localTopN = inTopN;
  const localGroupedData = inGroupedData;

  // Pure data transformation...
};
```

---

## Testing & Verification

The test suite runs on Node.js's native test runner (`node --test`) without third-party test framework overhead:

```bash
# Run unit test suite (17/17 tests passing)
npm test

# Run local playground via Vite
npm run dev

# Build bundled distribution into docs/dist/
npm run build
```

---

## CLI Reference

The zero-dependency CLI (`bin/cli.js`) can be executed via `npx json-to-dom-datalist`:

```bash
Usage:
  npx json-to-dom-datalist [destination] [options]

Arguments:
  [destination]                 Target folder (default: ./json-to-dom-datalist)

Options:
  --version-target=<version>    Target specific engine version (e.g. v1, v2)
  --list-versions               Display all available versions in src/
  --dry-run                     Preview operations without writing to disk
  -h, --help                    Show help message
```

---

## Scope & Philosophy

This library is intentionally focused on **declarative native HTML5 `<datalist>` generation**. It deliberately avoids reinventing custom popup dropdown menus, heavy scroll positioning engines, or virtualized multi-select listboxes. By embracing native browser capabilities, your application remains fast, accessible, and resilient.

---

## License

MIT &copy; [KeshavSoft](https://github.com/keshavsoft)
