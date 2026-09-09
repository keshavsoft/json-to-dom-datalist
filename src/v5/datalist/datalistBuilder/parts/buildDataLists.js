import { buildOptions } from "./buildOptions.js";

const buildDataLists = ({
    inData = [],
    inColumns = [],
    inTopN = 0
} = {}) => {
    return inColumns.map(col => {
        const key = col.key || "";
        const datalistId = col.datalistId || `${key}-datalist`;

        return {
            tagName: "datalist",
            attributes: {
                id: datalistId
            },
            children: buildOptions({
                inData,
                inKey: key,
                inTopN
            })
        };
    });
};

export { buildDataLists };
export default buildDataLists;