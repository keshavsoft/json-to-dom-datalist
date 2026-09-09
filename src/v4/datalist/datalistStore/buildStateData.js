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

        inActiveColumns.forEach(key => {
            returnObject[key] = row[key]
        });

        return returnObject;
    });

    return newData;
};

export { buildStateData };
export default buildStateData;