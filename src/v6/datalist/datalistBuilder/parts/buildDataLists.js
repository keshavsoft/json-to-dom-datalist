import { buildOptions } from "./buildOptions.js";

const buildDataLists = ({
    inData = {},
    inColumns = [],
    inTopN = 0
} = {}) => {
    return inColumns.map(col => {
        const key = typeof col === "string" ? col : col?.key || "";
        const datalistId = `${key}-datalist`;
        const children = buildOptions({
            inKey: key,
            inTopN,
            inGroupedData: inData[key]
        });
        console.log("children : ", children);

        return {
            tagName: "datalist",
            attributes: { id: datalistId },
            children
        };
    });
};

export { buildDataLists };
export default buildDataLists;