export const selectCompany = (state, guid) => state.companies.byId[guid];

export const getFormattedGames = (gameArr, gamesState) => {
    try {
        return gameArr.slice(0, gamesState.meta.limit/2).map(({api_detail_url}) => {
            const [,guid] = api_detail_url.match(/([^/]+)\/?$/);
            return gamesState.byId[guid];
        }).filter(game => !!game).slice(0, 12) // 12 = max num displayed elems
    } catch (e) {
        return [];
    }
}

export const selectCompanyGamesData = (state, guid) => {
    const {companies, games} = state;
    const {published_games=[], developed_games=[]} = companies.byId[guid] || {};
    const {isFetching, error} = games;
    return {
        publishedGames: getFormattedGames(published_games, games),
        developedGames: getFormattedGames(developed_games, games),
        isFetching,
        error,
    }
}