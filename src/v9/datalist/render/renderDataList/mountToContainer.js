const mountToContainer = ({
    inContainer,
    inElement
} = {}) => {
    if (!inContainer || !inElement) return;

    inContainer.innerHTML = "";
    inContainer.appendChild(inElement);
};

export { mountToContainer };
export default mountToContainer;