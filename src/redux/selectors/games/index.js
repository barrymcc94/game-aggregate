export const selectGame = (state, guid) => state.games.byId[guid];

export const selectGames = (state, id) => {
    const {byId} = state.games;
    const {ids = []} = state.games[id] || {};
    return ids.map((id) => byId[id]);
};
