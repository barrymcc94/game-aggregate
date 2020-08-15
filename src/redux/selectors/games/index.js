export const selectGames = (state, id) => {
    const {byId} = state.games;
    const {ids = []} = state.games[id] || {};
    return ids.map((id) => byId[id]);
};
