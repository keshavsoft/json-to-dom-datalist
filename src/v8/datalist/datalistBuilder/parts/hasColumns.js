const hasColumns = ({ inColumns = [] } = {}) => {
    return Array.isArray(inColumns) && inColumns.length > 0;
};

export { hasColumns };
export default hasColumns;