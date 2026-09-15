const buildWrapper = ({ inChildren = [] } = {}) => ({
    tagName: "div",
    attributes: {
        id: "ks-datalists-wrapper"
    },
    children: inChildren
});

export { buildWrapper };
export default buildWrapper;