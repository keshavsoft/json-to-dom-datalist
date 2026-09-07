# json-to-dom-datalist

Standalone, zero-dependency, config-driven HTML5 `<datalist>` autocomplete renderer built on top of `json-to-dom`.

## Features
- **Zero-Dependency**: Independent package rendering native browser autocomplete dropdown options.
- **Config-Driven**: Extracts distinct values from column data up to top-N entries.
- **Dynamic Updates**: Call `.update({ data })` to refresh `<datalist>` options instantly.

## Usage

```javascript
import { DataList } from "./src/index.js";

const dataList = new DataList({
    targetContainerId: "datalist-container",
    columns: sampleColumns,
    config: sampleDatalistConfig,
    data: sampleData
});

dataList.render();
```
