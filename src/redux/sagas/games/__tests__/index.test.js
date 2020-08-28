import {createMockTask} from '@redux-saga/testing-utils';
import {fetchGamesSaga, watchFetchGames, takeLatestByIdGen} from '../index';
import {
    FETCH_GAMES_SUCCEEDED,
    FETCH_GAMES_FAILED,
    CLEAR_GAMES_STATE,
} from '../../../types';

describe('Games Sagas', () => {
    const testResults = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    beforeEach(() => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        error: 'OK',
                        limit: 10,
                        offset: 0,
                        number_of_page_results: 10,
                        number_of_total_results: 100,
                        status_code: 1,
                        results: testResults,
                        version: '1.0',
                    }),
            })
        );
    });

    it('tests fetchGamesSaga when expecting success', async () => {
        const gen = fetchGamesSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_GAMES_SUCCEEDED);
        expect(payload).toEqual({
            data: testResults,
            meta: {
                limit: 10,
                offset: 0,
                total: 100,
            },
        });
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchGamesSaga when type is CLEAR_GAMES_STATE', async () => {
        const gen = fetchGamesSaga({type: CLEAR_GAMES_STATE});
        await gen.next().value;
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchGamesSaga when expecting error', async () => {
        const gen = fetchGamesSaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_GAMES_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchGamesSaga when expecting error response', async () => {
        jest.resetAllMocks();
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        error: 'Invalid API Key',
                        limit: 10,
                        offset: 0,
                        number_of_page_results: 10,
                        number_of_total_results: 100,
                        status_code: 100,
                        results: testResults,
                        version: '1.0',
                    }),
            })
        );
        const gen = fetchGamesSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_GAMES_FAILED);
        expect(payload).toEqual({error: 'Invalid API Key'});
        expect(gen.next().done).toBe(true);
    });
    it('tests watchFetchGames', async () => {
        const gen = watchFetchGames();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });

    it('tests takeLatestByIdGen', () => {
        const gen = takeLatestByIdGen('FETCH_GAMES_STARTED', fetchGamesSaga)();

        expect(
            gen.next({
                type: 'FETCH_GAMES_STARTED',
                payload: {id: 'games_id'},
            }).value.type
        ).toEqual('TAKE');

        expect(
            gen.next({
                type: 'FETCH_GAMES_STARTED',
                payload: {id: 'games_id'},
            }).value.type
        ).toEqual('FORK');

        expect(gen.next(createMockTask()).value.type).toEqual('TAKE');

        expect(
            gen.next({
                type: 'FETCH_GAMES_STARTED',
                payload: {id: 'games_id'},
            }).value.type
        ).toEqual('CANCEL');
    });
});
