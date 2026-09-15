import { renderDataList } from "../render/index.js";

/**
 * Story: Render structure via render/renderDataList
 */
const renderStructure = ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainerId = inContainerId || targetContainerId;
    const localContainer = inContainer;

    const result = renderDataList({
        inDataList: localDataList,
        inContainerId: localContainerId,
        inContainer: localContainer
    });

    if (result?.element) {
        localDataList.element = result.element;
        localDataList.controlsTree = result.treeWithIds;
    }

    return result;
};

export { renderStructure };
export default renderStructure;
