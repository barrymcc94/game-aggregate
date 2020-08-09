export const selectCompanies = (state) => {
    const {ids, byId} = state.companies;
    return ids.map((id) => byId[id]);
};
