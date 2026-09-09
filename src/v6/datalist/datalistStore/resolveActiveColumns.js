const resolveActiveColumns = ({
    inColumnsCatalog = [],
    inColumnKeys = []
} = {}) => {
    return inColumnsCatalog.filter(({ key }) =>
        inColumnKeys.includes(key)
    );
};

export { resolveActiveColumns };
export default resolveActiveColumns;