import { pruneTreeWithIds } from "../../common/index.js";

const renderNode = ({ inSpec } = {}) => {
    const localSpec = inSpec;
    if (!localSpec || typeof localSpec !== "object") return null;

    const element = document.createElement(localSpec.tagName || "div");

    if (localSpec.attributes && typeof localSpec.attributes === "object") {
        for (const [key, value] of Object.entries(localSpec.attributes)) {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, String(value));
            }
        }
    }

    if (localSpec.textContent !== undefined && localSpec.textContent !== null) {
        element.textContent = localSpec.textContent;
    }

    if (Array.isArray(localSpec.children)) {
        for (const childSpec of localSpec.children) {
            const childElement = renderNode({ inSpec: childSpec });
            if (childElement) {
                element.appendChild(childElement);
            }
        }
    }

    return element;
};

const renderStructure = ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainerId = inContainerId || targetContainerId || localDataList?.containerId;
    const localContainer = inContainer;

    const container = localContainer || (localContainerId ? document.getElementById(localContainerId) : null);
    if (!container) {
        console.warn(`[json-to-dom-datalist:renderStructure] Target container "${localContainerId}" not found.`);
        return null;
    }

    const rawSpec = localDataList.buildSpec();
    const { spec: stampedSpec, treeWithIds } = pruneTreeWithIds({ inSpec: rawSpec });

    container.innerHTML = "";
    const element = renderNode({ inSpec: stampedSpec });
    if (element) {
        container.appendChild(element);
    }

    return { element, treeWithIds, spec: stampedSpec };
};

export { renderStructure, renderNode };
export default renderStructure;
