import {fetchGameSaga, watchFetchGame} from '../index';
import {FETCH_GAME_SUCCEEDED, FETCH_GAME_FAILED} from '../../../types';

describe('Game Sagas', () => {
    const testResult = {id: 1};
    beforeEach(() => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                error: "OK",
                status_code: 1,
                results: testResult,
                version: "1.0",
            })
        }));
    });

    it('tests fetchGameSaga when expecting success', async () => {
        const gen = fetchGameSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_GAME_SUCCEEDED);
        expect(payload).toEqual({data: {id: 1}});
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchGameSaga when expecting error', async () => {
        const gen = fetchGameSaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_GAME_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchGameSaga when expecting error response', async () => {
        jest.resetAllMocks();
        fetch.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                error: "Invalid API Key",
                status_code: 100,
                results: {},
                version: "1.0",
            })
        }));
        const gen = fetchGameSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_GAME_FAILED);
        expect(payload).toEqual({error: 'Invalid API Key'});
        expect(gen.next().done).toBe(true);
    })

    it('tests watchFetchGame', async () => {
        const gen = watchFetchGame();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});