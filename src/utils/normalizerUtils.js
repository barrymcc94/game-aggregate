export const normalizeObjectListing = (objArr, idProp) => {
    if (!Array.isArray(objArr)) {
        return {
            ids: [],
            byId: {},
        };
    }
    return {
        ids: objArr.map((item) => item[idProp]),
        byId: objArr.reduce(
            (accum, item) => ({
                ...accum,
                [item[idProp]]: item,
            }),
            {}
        ),
    };
};

export const combineNormalizedListingObjs = (data1, data2) => ({
    byId: {
        ...data1.byId,
        ...data2.byId,
    },
    ids: [...new Set([...data1.ids, ...data2.ids])],
});
