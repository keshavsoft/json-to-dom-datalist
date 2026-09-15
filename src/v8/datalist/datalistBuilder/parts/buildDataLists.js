import { buildOptions } from "./buildOptions.js";

const buildDataLists = ({
    inData = {},
    inColumns = [],
    inTopN = 0,
    inTags
} = {}) => {
    return inColumns.map(col => {
        const key = typeof col === "string" ? col : col?.key || "";
        const datalistId = col?.datalistId || `${key}-datalist`;

        const children = buildOptions({
            inKey: key,
            inTopN,
            inGroupedData: inData[key],
            inTags
        });
        // console.log("children : ", children);

        return {
            tagName: "datalist",
            attributes: { id: datalistId },
            children
        };
    });
};

export { buildDataLists };
export default buildDataLists;