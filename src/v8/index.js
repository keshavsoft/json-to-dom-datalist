import registerGlobal from "./registerGlobal.js";
import { DataList } from "./datalist/index.js";

// const version = "v7.0.0";

// if (typeof globalThis !== "undefined") {
//     globalThis.ks ??= {};
//     globalThis.ks["json-to-dom-datalist"] = {
//         version,
//         DataList
//     };
// }

registerGlobal(DataList);

export { DataList };
export default DataList;
