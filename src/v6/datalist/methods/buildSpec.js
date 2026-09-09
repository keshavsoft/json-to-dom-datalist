import { buildDataList } from "../datalistBuilder/index.js";

const buildSpec = ({ inDataList } = {}) => {
    const localDataList = inDataList;
    if (!localDataList?.store) return null;

    // console.log("localDataList......... : ", localDataList);

    const distinctData = localDataList?.store?.library?.distinctData;
    const stateData = localDataList?.store?.library?.stateData;

    return buildDataList({
        inData: distinctData,
        inColumns: localDataList.store.activeColumns,
        inTopN: localDataList.store.topN
    });
};

export { buildSpec };
export default buildSpec;
