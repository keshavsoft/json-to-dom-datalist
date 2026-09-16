const resolveContainer = ({
    inDataList,
    inContainerId,
    inContainer,
    targetContainerId
} = {}) => {
    const localContainerId =
        inContainerId ||
        targetContainerId ||
        inDataList?.containerId;

    if (
        typeof HTMLElement !== "undefined" &&
        inContainer instanceof HTMLElement
    ) {
        return inContainer;
    }

    if (localContainerId && typeof document !== "undefined") {
        return document.getElementById(localContainerId);
    }

    return null;
};

export { resolveContainer };
export default resolveContainer;