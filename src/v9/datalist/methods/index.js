import compile from "../../../../node_modules/json-to-spec/src/index.js";
import { buildSpecElement } from "../../../../node_modules/@keshavsoft/json-to-dom/index.js";

// import { compile } from "json-to-spec";

// import { buildSpec } from "./buildSpec.js";
import { renderStructure } from "./renderStructure.js";
import structureJson from './structure.json' with {type: 'json'};

const createMethods = ({ inDataList } = {}) => {
    const localDataList = inDataList;
    const distinctData = localDataList.store.library.distinctData

    const structureArray = [];

    for (const [key, value] of Object.entries(distinctData)) {
        const newClone = structuredClone(structureJson);
        newClone.attributes.id = key;
        newClone.jsonToSpec.source = key;
        // newClone.jsonToSpec.template
        structureArray.push(newClone);
    };

    const localRenderStructure = ({ targetContainerId } = {}) => {
        const specAsJsonToDom = compile({
            specJson: structureArray,
            dataJson: distinctData
        });

        buildSpecElement({ spec: specAsJsonToDom, targetHtmlId: targetContainerId });

        return specAsJsonToDom;
    };

    return {
        renderStructure: localRenderStructure
    };
};

export {
    createMethods,
    renderStructure
};
