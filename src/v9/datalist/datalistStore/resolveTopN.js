const resolveTopN = ({
    inSource = {}
} = {}) => {
    return (
        inSource?.config?.datalist?.topN ??
        inSource?.topN ??
        0
    );
};

export { resolveTopN };
export default resolveTopN;