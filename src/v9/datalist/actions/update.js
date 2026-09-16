const update = ({ inDataList, inData = [] } = {}) => {
    const localDataList = inDataList;
    const localData = inData;

    if (!localDataList) return null;

    localDataList.store.updateData({ inData: localData });
    return localDataList.renderStructure();
};

export { update };
export default update;
