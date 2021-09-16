export const selectFranchise = (state, guid) => state.franchises.byId[guid];

export const selectFranchises = (state, id) => {
    const {byId} = state.franchises;
    const {ids = []} = state.franchises[id] || {};
    return ids.map((id) => byId[id]);
};
