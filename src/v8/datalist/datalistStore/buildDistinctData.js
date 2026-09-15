const startFunc = ({
    inStateData = [],
    inActiveColumns = []
} = {}) => {
    const localStateData = inStateData;

    let returnObject = {};

    inActiveColumns.forEach(col => {
        const key = typeof col === "string" ? col : col?.key || "";
        if (!key) return;

        const singleColumnData = localStateData.map(row => {
            return row[key];
        });

        const unique = [...new Set(singleColumnData)];

        returnObject[key] = unique;
    });

    return returnObject;
};

export default startFunc;