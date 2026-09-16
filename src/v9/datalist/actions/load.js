const load = async ({ inDataList, inQuery = {} } = {}) => {
    const localDataList = inDataList;
    const localQuery = inQuery;

    if (!localDataList) return null;

    if (typeof localDataList.dataProvider === "function") {
        try {
            const fetchedData = await localDataList.dataProvider(localQuery);
            if (Array.isArray(fetchedData)) {
                localDataList.store.updateData({ inData: fetchedData });
                localDataList.renderStructure();
            }
        } catch (error) {
            console.error("[json-to-dom-datalist:actions:load] Error loading data:", error);
        }
    }

    return localDataList.store.stateData;
};

export { load };
export default load;
