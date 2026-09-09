const startFunc = ({
    inStateData = [],
    inActiveColumns = []
} = {}) => {
    const localStateData = inStateData;

    let returnObject = {};

    inActiveColumns.forEach(key => {
        const singleColumnData = localStateData.map(row => {
            return row[key];
        });

        const unique = [...new Set(singleColumnData)];

        returnObject[key] = unique;
    });

    return returnObject;
};

export default startFunc;