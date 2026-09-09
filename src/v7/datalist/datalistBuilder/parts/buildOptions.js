const buildOptions = ({ inGroupedData = [], inTags } = {}) => {
    const localGroupedData = inGroupedData;
    const optionTagSpec = { ...inTags.option };
    console.log("optionTagSpec : ", optionTagSpec);

    const builtOptions = localGroupedData.map(element => {
        let loopInsideObject = {};
        loopInsideObject.tagName = "option";
        loopInsideObject.attributes = { value: element };
        loopInsideObject.textContent = element;

        return loopInsideObject;
    });

    // return [...counts].map(([value, count]) => ({
    //     tagName: "option",
    //     attributes: {
    //         value,
    //         label: `${value} (${count})`
    //     },
    //     textContent: `${value} (${count})`
    // }));

    return builtOptions;
};

export { buildOptions };
export default buildOptions;