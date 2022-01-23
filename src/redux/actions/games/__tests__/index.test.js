import {
    FETCH_GAME_STARTED,
    FETCH_GAME_SUCCEEDED,
    FETCH_GAME_FAILED,
    FETCH_GAMES_STARTED,
    FETCH_GAMES_SUCCEEDED,
    FETCH_GAMES_FAILED,
} from '../../../types';
import {
    fetchGameStarted,
    fetchGameSucceeded,
    fetchGameFailed,
    fetchGame,
    fetchGamesStarted,
    fetchGamesSucceeded,
    fetchGamesFailed,
    fetchGames,
} from '../index';

describe('Game Actions', () => {
    it('tests fetchGameStarted', () => {
        const action = fetchGameStarted({});
        expect(action).toEqual({
            type: FETCH_GAME_STARTED,
            payload: {},
        });
    });

    it('tests fetchGameSucceeded', () => {
        const action = fetchGameSucceeded({});
        expect(action).toEqual({
            type: FETCH_GAME_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchGamesFailed', () => {
        const action = fetchGameFailed({});
        expect(action).toEqual({
            type: FETCH_GAME_FAILED,
            payload: {},
        });
    });

    it('tests fetchGame', async () => {
        const action = await global.testStore.dispatch(fetchGame({}));
        expect(action).toEqual({
            type: FETCH_GAME_STARTED,
            payload: {},
        });
    });
});

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
});
