import { DataList } from "./datalist/index.js";

const version = "v3.0.0";

if (typeof globalThis !== "undefined") {
    globalThis.ks ??= {};
    globalThis.ks["json-to-dom-datalist"] = {
        version,
        DataList
    };
}

export { version, DataList };
export default DataList;
