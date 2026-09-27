// import "json-to-spec";
import "../../src/index.js";
// debugger
import data from './data.json' with {type: 'json'};
import columns from './columns.json' with {type: 'json'};
import datalistConfig from "./datalist/config.json" with { type: "json" };

const { DataList } = window.ks.jsonToDomDatalist;

const dataList = new DataList({
    data, columns, config: datalistConfig,
    targetContainerId: "datalist-container"
});

dataList.render({
    targetContainerId: "datalist-container"
});

console.log("dataList :", dataList);