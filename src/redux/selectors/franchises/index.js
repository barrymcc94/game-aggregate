export const selectFranchises = (state) => {
    const {ids, byId} = state.franchises;
    return ids.map((id) => byId[id]);
};
