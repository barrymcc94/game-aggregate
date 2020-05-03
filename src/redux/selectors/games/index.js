export const selectGames = (state) => {
    const {ids, byId} = state.games;
    return ids.map(id => byId[id]);
}