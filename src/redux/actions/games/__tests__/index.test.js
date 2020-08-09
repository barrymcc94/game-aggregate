import {
    FETCH_GAMES_STARTED,
    FETCH_GAMES_SUCCEEDED,
    FETCH_GAMES_FAILED,
    SET_GAMES_SEARCH_FILTERS,
} from '../../../types';
import {
    fetchGamesStarted,
    fetchGamesSucceeded,
    fetchGamesFailed,
    fetchGames,
    setGamesSearchFilters,
} from '../index';

describe('Games Actions', () => {
    it('tests fetchGamesStarted', () => {
        const action = fetchGamesStarted({});
        expect(action).toEqual({
            type: FETCH_GAMES_STARTED,
            payload: {},
        });
    });

    it('tests fetchGamesSucceeded', () => {
        const action = fetchGamesSucceeded({});
        expect(action).toEqual({
            type: FETCH_GAMES_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchGamesFailed', () => {
        const action = fetchGamesFailed({});
        expect(action).toEqual({
            type: FETCH_GAMES_FAILED,
            payload: {},
        });
    });

    it('tests fetchGames', async () => {
        const action = await global.testStore.dispatch(fetchGames({}));
        expect(action).toEqual({
            type: FETCH_GAMES_STARTED,
            payload: {},
        });
    });

    it('tests setGamesSearchFilters', async () => {
        const action = await global.testStore.dispatch(
            setGamesSearchFilters({})
        );
        expect(action).toEqual({
            type: SET_GAMES_SEARCH_FILTERS,
            payload: {},
        });
    });
});
