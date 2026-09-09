# Architecture

`json-to-dom-datalist` follows the KeshavSoft modular engine architecture, decoupling state management, spec building, and lifecycle methods into cohesive folders.

## Folder Structure (src's highest version: v2)

```
src/
├── index.js                     # Root proxy resolving src's highest version
└── v2/
    ├── common/                  # Shared utilities
    │   ├── SourceStore.js       # Base catalog resolution & cloning
    │   ├── cloneData.js         # Immutable deep clone helper
    │   ├── groupBy.js           # Distinct value and frequency counter
    │   ├── pruneTreeWithIds.js  # Control tree extractor
    │   └── index.js
    ├── datalist/                # Core DataList component
    │   ├── DataList.js          # Master class orchestrator
    │   ├── actions/             # State-mutating actions (load, update)
    │   ├── methods/             # Spec builder & render lifecycle methods
    │   ├── datalistStore/       # Dedicated state store (DataListStore.js)
    │   ├── datalistBuilder/     # Declarative JSON spec tree generator
    │   │   ├── buildDataList.js # Assembles <datalist> wrapper and specs
    │   │   └── parts/
    │   │       └── buildOptions.js # Assembles <option> elements from groupBy
    │   └── render/              # Target container resolution and DOM mounting
    └── index.js                 # Version export and global window.ks registration
```

## Layer Responsibilities

### 1. DataListStore (`datalistStore/`)
- Subclasses `SourceStore` to manage raw data records, column catalogs, and configuration objects.
- Isolates immutable state from DOM manipulation.

### 2. DatalistBuilder (`datalistBuilder/`)
- Pure function transforming state arrays into JSON specifications suitable for `json-to-dom`.
- Builds `<option value="..." label="...">` elements with occurrence counts.

### 3. Actions & Methods (`actions/`, `methods/`)
- `methods.buildSpec()`: Compiles the full JSON tree.
- `methods.renderStructure()`: Resolves target container and mounts the elements into the live DOM.
- `actions.update({ inData })`: Re-aggregates options and updates the DOM in place.

### 4. KeshavSoft Naming Convention
Every function strictly follows the KeshavSoft `{ in... }` argument contract and local variable scoping:
```javascript
const buildDataList = ({ inData = [], inColumns = [], inTopN = 0 } = {}) => {
  const localData = inData;
  const localColumns = inColumns;
  const localTopN = inTopN;
  // ...
};
```
