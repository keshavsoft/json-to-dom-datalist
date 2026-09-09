import { cloneData } from "../../common/cloneData.js";

const buildStateData = ({
    inData = [],
    inActiveColumns = []
} = {}) => {
    const clonedData = cloneData({
        inData
    });

    const newData = clonedData.map(row => {
        let returnObject = {};

        inActiveColumns.forEach(col => {
            const key = typeof col === "string" ? col : col?.key || "";
            if (key) returnObject[key] = row[key];
        });

        return returnObject;
    });

    return newData;
};

export { buildStateData };
export default buildStateData;