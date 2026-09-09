import { hasColumns } from "./parts/hasColumns.js";
import { buildEmptyWrapper } from "./parts/buildEmptyWrapper.js";
import { buildDataLists } from "./parts/buildDataLists.js";
import { buildWrapper } from "./parts/buildWrapper.js";

const buildDataList = ({ inData = [], inColumns = [], inTopN = 0 } = {}) => {
    if (!hasColumns({ inColumns })) {
        return buildEmptyWrapper();
    }

    const children = buildDataLists({
        inData,
        inColumns,
        inTopN
    });

    return buildWrapper({ inChildren: children });
};

export { buildDataList };
export default buildDataList;