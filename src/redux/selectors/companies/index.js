export const selectCompany = (state, guid) => state.companies.byId[guid];

export const selectCompanies = (state, id) => {
    const {byId} = state.companies;
    const {ids = []} = state.companies[id] || {};
    return ids.map((id) => byId[id]);
};
