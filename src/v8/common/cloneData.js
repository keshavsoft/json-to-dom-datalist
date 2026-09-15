const cloneData = ({ inData } = {}) => {
    const localData = inData;
    if (localData === undefined || localData === null) {
        return [];
    }

    if (typeof structuredClone === "function") {
        try {
            return structuredClone(localData);
        } catch {
            // Fallback for non-cloneable objects
        }
    }

    try {
        return JSON.parse(JSON.stringify(localData));
    } catch {
        return Array.isArray(localData) ? [...localData] : { ...localData };
    }
};

export { cloneData };
export default cloneData;
