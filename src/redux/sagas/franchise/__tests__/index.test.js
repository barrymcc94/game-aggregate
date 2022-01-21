import {fetchFranchiseSaga, watchFetchFranchise} from '../index';
import {
    FETCH_FRANCHISE_SUCCEEDED,
    FETCH_FRANCHISE_FAILED,
} from '../../../types';

describe('Franchise Sagas', () => {
    const testResult = {id: 1, games: [{id: 1}]};
    beforeEach(() => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        error: 'OK',
                        status_code: 1,
                        results: testResult,
                        version: '1.0',
                    }),
            })
        );
    });

    it('tests fetchFranchiseSaga when expecting success', async () => {
        const dispatch = jest.fn();
        const gen = fetchFranchiseSaga({payload: {}});
        const data = await gen.next().value; // results from api
        const put = await gen.next(data).value.payload.action;
        put(dispatch);
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toBeCalledWith({
            type: 'FETCH_FRANCHISE_SUCCEEDED',
            payload: {data: {id: 1, games: [{id: 1}]}},
        });
        expect(dispatch).toBeCalledWith({
            type: 'FETCH_GAMES_STARTED',
            payload: {
                id: 'franchiseGames_undefined',
                meta: {
                    limit: 100,
                },
                queryObj: {
                    filter: 'original_release_date:|2020-6-14 00:00:00,id:1',
                    limit: 100,
                    offset: 0,
                    sort: 'original_release_date:desc',
                },
            },
        });
        // expect(gen.next().done).toBe(true);
    });

    it('tests fetchFranchiseSaga when expecting error', async () => {
        const gen = fetchFranchiseSaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_FRANCHISE_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchFranchiseSaga when expecting error response', async () => {
        jest.resetAllMocks();
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        error: 'Invalid API Key',
                        status_code: 100,
                        results: {},
                        version: '1.0',
                    }),
            })
        );
        const gen = fetchFranchiseSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_FRANCHISE_FAILED);
        expect(payload).toEqual({error: 'Invalid API Key'});
        expect(gen.next().done).toBe(true);
    });

    it('tests watchFetchFranchise', async () => {
        const gen = watchFetchFranchise();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});
