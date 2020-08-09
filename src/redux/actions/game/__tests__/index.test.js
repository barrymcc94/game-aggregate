import {
    FETCH_GAME_STARTED,
    FETCH_GAME_SUCCEEDED,
    FETCH_GAME_FAILED,
} from '../../../types';
import {
    fetchGameStarted,
    fetchGameSucceeded,
    fetchGameFailed,
    fetchGame,
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
