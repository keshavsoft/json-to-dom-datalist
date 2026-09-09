import { buildSpec } from "./buildSpec.js";
import { renderStructure } from "./renderStructure.js";

const methods = {
    buildSpec,
    renderStructure
};

const createMethods = ({ inDataList } = {}) => {
    const localDataList = inDataList;

    const localBuildSpec = () => {
        return buildSpec({ inDataList: localDataList });
    };

    const localRenderStructure = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        return renderStructure({
            inDataList: localDataList,
            inContainerId,
            inContainer,
            targetContainerId
        });
    };

    return {
        buildSpec: localBuildSpec,
        renderStructure: localRenderStructure
    };
};

export { methods, createMethods, buildSpec, renderStructure };
export default methods;
