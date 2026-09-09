import { pruneTreeWithIds } from "../../common/index.js";

/**
 * Story Step: Build DOM node from declarative specification
 */
const renderNode = ({ inSpec } = {}) => {
    const localSpec = inSpec;
    if (!localSpec || typeof localSpec !== "object") return null;

    // Check if json-to-dom builder is available on globalThis/window
    const builder = (typeof window !== "undefined" ? window : globalThis)?.ks?.["json-to-dom"]?.buildSpecElement;
    if (typeof builder === "function") {
        try {
            const built = builder({ inSpec: localSpec });
            return Array.isArray(built) ? built[0] : built;
        } catch {
            // Fallback to native element creation
        }
    }

    if (typeof document === "undefined") return null;

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

/**
 * Story Step 1: Resolve and validate target mount container
 */
const resolveContainer = ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainer = inContainer;
    const localContainerId = inContainerId || targetContainerId || localDataList?.containerId;

    if (typeof HTMLElement !== "undefined" && localContainer instanceof HTMLElement) {
        return localContainer;
    }

    if (localContainerId && typeof document !== "undefined") {
        return document.getElementById(localContainerId);
    }

    return null;
};

/**
 * Story Step 4: Clear and mount DOM element to container
 */
const mountToContainer = ({ inContainer, inElement } = {}) => {
    const localContainer = inContainer;
    const localElement = inElement;

    if (!localContainer || !localElement) return;

    localContainer.innerHTML = "";
    localContainer.appendChild(localElement);
};

/**
 * Main Orchestration Story: Render DataList to DOM
 * Step 1: Resolve target container
 * Step 2: Build declarative JSON specification
 * Step 3: Extract controls tree with IDs
 * Step 4: Render DOM nodes from specification and mount
 * Step 5: Return result object
 */
const renderDataList = ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainerId = inContainerId;
    const localContainer = inContainer;
    const localTargetContainerId = targetContainerId;

    if (!localDataList) {
        return { element: null, treeWithIds: null, spec: null, error: "DataList instance is required" };
    }

    // Story Step 1: Resolve target mount container
    const container = resolveContainer({
        inDataList: localDataList,
        inContainerId: localContainerId,
        inContainer: localContainer,
        targetContainerId: localTargetContainerId
    });

    // Story Step 2: Build declarative JSON specification
    const rawSpec = localDataList.buildSpec();

    // Story Step 3: Extract controls tree with IDs
    const treeWithIds = pruneTreeWithIds({ inSpec: rawSpec });

    // Story Step 4: Render DOM element from spec and mount if container exists
    let element = null;
    if (typeof document !== "undefined") {
        element = renderNode({ inSpec: rawSpec });
        if (container && element) {
            mountToContainer({ inContainer: container, inElement: element });
        }
    }

    localDataList.element = element;
    localDataList.controlsTree = treeWithIds;

    // Story Step 5: Return result
    return {
        element,
        treeWithIds,
        spec: rawSpec
    };
};

export { renderDataList, renderNode, resolveContainer, mountToContainer };
export default renderDataList;
