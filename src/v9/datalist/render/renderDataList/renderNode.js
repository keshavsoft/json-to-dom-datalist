const renderNode = ({ inSpec } = {}) => {
    if (!inSpec || typeof inSpec !== "object") return null;

    const builder = (typeof window !== "undefined"
        ? window
        : globalThis)?.ks?.["json-to-dom"]?.buildSpecElement;

    if (typeof builder === "function") {
        try {
            const built = builder({ inSpec });
            return Array.isArray(built) ? built[0] : built;
        } catch { }
    }

    if (typeof document === "undefined") return null;

    const element = document.createElement(inSpec.tagName || "div");

    for (const [key, value] of Object.entries(inSpec.attributes || {})) {
        if (value !== undefined && value !== null) {
            element.setAttribute(key, String(value));
        }
    }

    if (inSpec.textContent !== undefined && inSpec.textContent !== null) {
        element.textContent = inSpec.textContent;
    }

    for (const childSpec of inSpec.children || []) {
        const childElement = renderNode({ inSpec: childSpec });
        if (childElement) element.appendChild(childElement);
    }

    return element;
};

export { renderNode };
export default renderNode;