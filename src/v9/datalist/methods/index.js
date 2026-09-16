// import { buildSpec } from "./buildSpec.js";
import { renderStructure } from "./renderStructure.js";
import structureJson from './structure.json' with {type: 'json'};

const createMethods = ({ inDataList } = {}) => {
    const localDataList = inDataList;
    // const k1 = buildSpec({ inDataList: localDataList });
    const distinctData = inDataList.store.library.distinctData
    // console.log("k1 : ", distinctData);

    const structureArray = [];

    for (const [key, value] of Object.entries(distinctData)) {
        const newClone = structuredClone(structureJson);
        newClone.attributes.id = key;
        newClone.jsonToSpec.source = key;
        // newClone.jsonToSpec.template
        structureArray.push(newClone);
    };

    const localBuildSpec = () => {
        const specAsJsonToDom = window.ks['json-to-spec'].compile(structureArray, distinctData, true);

        return specAsJsonToDom;
        // return buildSpec({ inDataList: localDataList });
    };

    const localRenderStructure = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        // console.log("structureArray : ", structureArray, distinctData);

        const specAsJsonToDom = window.ks['json-to-spec'].compile(structureArray, distinctData, true);

        // console.log("specAsJsonToDom : ", specAsJsonToDom);

        window.ks['json-to-dom'].buildSpecElement({ spec: specAsJsonToDom, targetHtmlId: "datalist-container" });

        return specAsJsonToDom;
    };

    return {
        buildSpec: localBuildSpec,
        renderStructure: localRenderStructure
    };
};

export {
    createMethods,
    renderStructure
};
