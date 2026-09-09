import { buildStateData } from "./buildStateData.js";
import buildDistinctData from "./buildDistinctData.js";

const buildLibrary = ({
    inSource = {}
} = {}) => {

    const activeColumns =
        inSource?.config?.datalist?.columns ||
        inSource?.config?.columns ||
        inSource?.columns ||
        [];

    const stateData = buildStateData({
        inData: inSource?.originalData,
        inActiveColumns: activeColumns
    });

    const distinctData = buildDistinctData({
        inStateData: stateData,
        inActiveColumns: activeColumns
    });

    const topN =
        inSource?.config?.datalist?.topN ??
        inSource?.topN ??
        0;

    return {
        activeColumns,
        stateData,
        distinctData,
        topN
    };
};

export { buildLibrary };
export default buildLibrary;