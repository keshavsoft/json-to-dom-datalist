const buildOptions = ({ inGroupedData = [] } = {}) => {
    const counts = new Map();

    for (const value of inGroupedData) {
        counts.set(value, (counts.get(value) || 0) + 1);
    }

    return [...counts].map(([value, count]) => ({
        tagName: "option",
        attributes: {
            value,
            label: `${value} (${count})`
        },
        textContent: `${value} (${count})`
    }));
};

export { buildOptions };
export default buildOptions;