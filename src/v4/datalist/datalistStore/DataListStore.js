import { SourceStore } from "../../common/SourceStore.js";
import { buildLibrary } from "./buildLibrary.js";
import { updateStateData } from "./updateStateData.js";

class DataListStore extends SourceStore {
    constructor({
        inData = [],
        inColumns = [],
        inConfig = {},
        inTopN = 0
    } = {}) {
        super({
            inData,
            inColumns,
            inConfig,
            inTopN
        });

        this.library = buildLibrary({
            inSource: this.source
        });
    }

    get stateData() {
        return this.library.stateData;
    }

    get activeColumns() {
        return this.library.activeColumns;
    }

    get topN() {
        return this.library.topN;
    }

    updateData({ inData = [] } = {}) {
        this.library.stateData = updateStateData({
            inData
        });

        return this.library.stateData;
    }
}

export { DataListStore };
export default DataListStore;