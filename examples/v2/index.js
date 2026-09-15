import data from './data.json' with {type: 'json'};
import columns from './columns.json' with {type: 'json'};
import datalistConfig from "./datalist/config.json" with { type: "json" };

const { DataList } = window.ks['json-to-dom-datalist'];

const dataList = new DataList({
    data, columns, config: datalistConfig,
    targetContainerId: "datalist-container"
});

await dataList.render({
    targetContainerId: "datalist-container"
});

console.log("dataList :", dataList);