# How It Works

`json-to-dom-datalist` follows a declarative 5-stage pipeline:

```
[Raw Tabular Data] + [Columns Definition] + [Config]
                     ↓
             1. DataListStore
          (Normalizes & Clones)
                     ↓
             2. Aggregation
       (groupBy: distinct & counts)
                     ↓
             3. DatalistBuilder
      (JSON-to-DOM Spec Generation)
                     ↓
             4. DOM Mounting
     (Mounted to Target Container)
                     ↓
     5. Native Browser Autocomplete
    (<input list="column-datalist">)
```

## Step 1: Define Columns and Data
Each column specifies a `key` to read from data objects and an optional `datalistId` (defaulting to `${key}-datalist`):
```javascript
const columns = [
  { key: "stockItemName", label: "Stock Item", datalistId: "stock-datalist" },
  { key: "batchName", label: "Batch Name", datalistId: "batch-datalist" }
];
```

## Step 2: Configure Top-N and Active Columns
```javascript
const config = {
  datalist: {
    columns: ["stockItemName", "batchName"],
    topN: 10 // Limit each datalist to the top 10 most frequent items
  }
};
```

## Step 3: Instantiate & Render
```javascript
import { DataList } from "json-to-dom-datalist";

const dl = new DataList({
  columns,
  config,
  data: sampleRecords,
  targetContainerId: "datalist-container"
});

await dl.render();
```

## Step 4: Bind Any HTML Input
Any input element on the page can now link to the datalist using its `list` attribute:
```html
<input type="text" name="stock" list="stock-datalist" placeholder="Select stock item...">
```
The browser takes care of instant substring filtering and autocomplete popup menus natively!
