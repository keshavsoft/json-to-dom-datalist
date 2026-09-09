import test from "node:test";
import assert from "node:assert/strict";

// Global mock for window / globalThis browser environment
if (typeof window === "undefined") {
    globalThis.window = globalThis;
}

import { DataList, version } from "../src/index.js";
import { groupBy } from "../src/v2/common/groupBy.js";
import { DataListStore } from "../src/v2/datalist/datalistStore/DataListStore.js";
import { buildDataList } from "../src/v2/datalist/datalistBuilder/buildDataList.js";
import { buildOptions } from "../src/v2/datalist/datalistBuilder/parts/buildOptions.js";

const sampleData = [
    { stockItemName: "ROPE 10MM High Tensile", batchName: "BATCH-A", amount: 3000 },
    { stockItemName: "ROPE 10MM High Tensile", batchName: "BATCH-B", amount: 1500 },
    { stockItemName: "Shading Net 50% Green", batchName: "BATCH-A", amount: 1250 },
    { stockItemName: "PVC Pipe 2 Inch", batchName: "BATCH-C", amount: 800 },
    { stockItemName: "ROPE 10MM High Tensile", batchName: "BATCH-A", amount: 4200 }
];

const sampleColumns = [
    { key: "stockItemName", label: "Stock Item", datalistId: "stock-datalist" },
    { key: "batchName", label: "Batch Name", datalistId: "batch-datalist" }
];

const sampleConfig = {
    datalist: {
        columns: ["stockItemName", "batchName"],
        topN: 5
    }
};

test("1. Engine Exports & Global Registration", async (t) => {
    await t.test("exports DataList class and version string", () => {
        assert.ok(DataList, "DataList class should be exported");
        assert.equal(typeof DataList, "function");
        assert.ok(version, "version should be exported");
        assert.equal(version, "v2.0.0");
    });

    await t.test("registers on global window.ks['json-to-dom-datalist']", () => {
        assert.ok(window.ks?.["json-to-dom-datalist"], "global ks registry entry should exist");
        assert.equal(window.ks["json-to-dom-datalist"].version, "v2.0.0");
        assert.equal(window.ks["json-to-dom-datalist"].DataList, DataList);
    });
});

test("2. groupBy Aggregation Utility", async (t) => {
    await t.test("extracts distinct values and accurate frequency counts", () => {
        const grouped = groupBy({ inData: sampleData, inKey: "stockItemName" });
        assert.equal(grouped.length, 3, "should find 3 distinct stock items");

        const ropeItem = grouped.find(g => g.value === "ROPE 10MM High Tensile");
        assert.ok(ropeItem, "ROPE item must be present");
        assert.equal(ropeItem.count, 3, "ROPE appeared 3 times in sample data");

        const shadingItem = grouped.find(g => g.value === "Shading Net 50% Green");
        assert.equal(shadingItem.count, 1);
    });

    await t.test("honors inTopN limiting", () => {
        const grouped = groupBy({ inData: sampleData, inKey: "stockItemName", inTopN: 2 });
        assert.equal(grouped.length, 2, "should limit to top 2 entries");
    });

    await t.test("handles empty or invalid data gracefully", () => {
        const empty = groupBy({ inData: [], inKey: "stockItemName" });
        assert.deepEqual(empty, []);

        const noKey = groupBy({ inData: sampleData, inKey: "" });
        assert.deepEqual(noKey, []);
    });
});

test("3. DataListStore State Management", async (t) => {
    await t.test("resolves active columns and state data", () => {
        const store = new DataListStore({
            inData: sampleData,
            inColumns: sampleColumns,
            inConfig: sampleConfig
        });

        assert.equal(store.stateData.length, sampleData.length);
        assert.equal(store.activeColumns.length, 2);
        assert.equal(store.topN, 5);
    });

    await t.test("updates data dynamically via updateData()", () => {
        const store = new DataListStore({
            inData: sampleData,
            inColumns: sampleColumns,
            inConfig: sampleConfig
        });

        const newData = [{ stockItemName: "New Item", batchName: "BATCH-X" }];
        store.updateData({ inData: newData });
        assert.equal(store.stateData.length, 1);
        assert.equal(store.stateData[0].stockItemName, "New Item");
    });
});

test("4. Datalist Spec Builder", async (t) => {
    await t.test("buildOptions generates valid JSON-to-DOM option specifications", () => {
        const options = buildOptions({
            inData: sampleData,
            inKey: "batchName",
            inTopN: 10
        });

        assert.ok(Array.isArray(options));
        assert.equal(options.length, 3, "BATCH-A, BATCH-B, BATCH-C");

        const firstOpt = options[0];
        assert.equal(firstOpt.tagName, "option");
        assert.ok(firstOpt.attributes?.value);
        assert.ok(firstOpt.textContent);
    });

    await t.test("buildDataList generates wrapping div with datalist children", () => {
        const spec = buildDataList({
            inData: sampleData,
            inColumns: sampleColumns,
            inTopN: 5
        });

        assert.equal(spec.tagName, "div");
        assert.equal(spec.attributes?.id, "ks-datalists-wrapper");
        assert.equal(spec.children.length, 2);

        const datalist1 = spec.children[0];
        assert.equal(datalist1.tagName, "datalist");
        assert.equal(datalist1.attributes?.id, "stock-datalist");
        assert.ok(datalist1.children.length > 0);
    });
});

test("5. DataList Class Runtime & Orchestration", async (t) => {
    await t.test("instantiates and creates declarative spec", () => {
        const dl = new DataList({
            columns: sampleColumns,
            config: sampleConfig,
            data: sampleData,
            targetContainerId: "my-datalist-container"
        });

        assert.equal(dl.containerId, "my-datalist-container");
        assert.ok(dl.spec);
        assert.equal(dl.spec.tagName, "div");
        assert.equal(dl.spec.children.length, 2);
    });

    await t.test("getGroupedData returns distinct values for a key", () => {
        const dl = new DataList({
            columns: sampleColumns,
            config: sampleConfig,
            data: sampleData
        });

        const batches = dl.getGroupedData({ inKey: "batchName" });
        assert.equal(batches.length, 3);
        const batchA = batches.find(b => b.value === "BATCH-A");
        assert.equal(batchA.count, 3);
    });

    await t.test("update() refreshes data and recalculates spec", () => {
        const dl = new DataList({
            columns: sampleColumns,
            config: sampleConfig,
            data: sampleData
        });

        const updatedData = [
            { stockItemName: "Steel Cable 5MM", batchName: "BATCH-Z", amount: 100 }
        ];

        dl.update({ inData: updatedData });
        assert.equal(dl.data.length, 1);

        const updatedSpec = dl.buildSpec();
        const stockDatalist = updatedSpec.children[0];
        assert.equal(stockDatalist.children.length, 1);
        assert.equal(stockDatalist.children[0].attributes?.value, "Steel Cable 5MM");
    });
});
