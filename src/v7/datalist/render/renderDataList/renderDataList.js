import { pruneTreeWithIds } from "../../../common/pruneTreeWithIds.js";
import { resolveContainer } from "./resolveContainer.js";
import { renderNode } from "./renderNode.js";
import { mountToContainer } from "./mountToContainer.js";

const renderDataList = ({
    inDataList,
    inContainerId,
    inContainer,
    targetContainerId
} = {}) => {
    if (!inDataList) {
        return {
            element: null,
            treeWithIds: null,
            spec: null,
            error: "DataList instance is required"
        };
    };
    // debugger
    const container = resolveContainer({
        inDataList,
        inContainerId,
        inContainer,
        targetContainerId
    });

    const spec = inDataList.buildSpec();

    const treeWithIds = pruneTreeWithIds({
        inSpec: spec
    });

    const element = renderNode({
        inSpec: spec
    });

    if (container && element) {
        mountToContainer({
            inContainer: container,
            inElement: element
        });
    }

    inDataList.element = element;
    inDataList.controlsTree = treeWithIds;

    return {
        element,
        treeWithIds,
        spec
    };
};

export { renderDataList };
export default renderDataList;