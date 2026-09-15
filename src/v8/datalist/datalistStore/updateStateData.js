const updateStateData = ({
    inData = []
} = {}) => {
    return Array.isArray(inData)
        ? inData
        : [];
};

export { updateStateData };
export default updateStateData;