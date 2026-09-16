const pruneTreeWithIds = ({ inSpec } = {}) => {
    const localSpec = inSpec;
    if (!localSpec || typeof localSpec !== "object") return null;

    const result = {};

    const traverse = (node) => {
        if (!node || typeof node !== "object") return;

        const id = node.attributes?.id;
        if (id) {
            result[id] = {
                tagName: node.tagName,
                attributes: { ...node.attributes }
            };
        }

        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    };

    traverse(localSpec);
    return Object.keys(result).length > 0 ? result : null;
};

export { pruneTreeWithIds };
export default pruneTreeWithIds;
