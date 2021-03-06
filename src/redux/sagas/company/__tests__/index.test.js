import {fetchCompanySaga, watchFetchCompany} from '../index';
import {
    FETCH_COMPANY_SUCCEEDED,
    FETCH_COMPANY_FAILED,
    FETCH_GAMES_STARTED,
} from '../../../types';

describe('Company Sagas', () => {
    const testResult = {
        id: 1,
        published_games: [{id: 1}, {id: 2}],
        developed_games: [{id: 3}, {id: 4}],
    };
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

    it('tests fetchCompanySaga when expecting success', async () => {
        const gen = fetchCompanySaga({payload: {}});
        const data = await gen.next().value;
        const gamesStartedAction1 = await gen.next(data).value.payload.action;
        expect(gamesStartedAction1.type).toBe(FETCH_GAMES_STARTED);
        expect(gamesStartedAction1.payload).toEqual({
            id: 'companyPublishedGames_undefined',
            meta: {
                limit: 100,
            },
            queryObj: {
                filter: 'original_release_date:|2020-6-14 00:00:00,id:1|2',
                limit: 100,
                offset: 0,
                sort: 'original_release_date:desc',
            },
        });
        const gamesStartedAction2 = await gen.next(data).value.payload.action;
        expect(gamesStartedAction2.type).toBe(FETCH_GAMES_STARTED);
        expect(gamesStartedAction2.payload).toEqual({
            id: 'companyDevelopedGames_undefined',
            meta: {
                limit: 100,
            },
            queryObj: {
                filter: 'original_release_date:|2020-6-14 00:00:00,id:3|4',
                limit: 100,
                offset: 0,
                sort: 'original_release_date:desc',
            },
        });
        const companySucceededAction = await gen.next(data).value.payload
            .action;
        expect(companySucceededAction.type).toBe(FETCH_COMPANY_SUCCEEDED);
        expect(companySucceededAction.payload).toEqual({
            data: {
                id: 1,
                published_games: [{id: 1}, {id: 2}],
                developed_games: [{id: 3}, {id: 4}],
            },
        });
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchCompanySaga when expecting error', async () => {
        const gen = fetchCompanySaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_COMPANY_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchCompanySaga when expecting error response', async () => {
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
        const gen = fetchCompanySaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_COMPANY_FAILED);
        expect(payload).toEqual({error: 'Invalid API Key'});
        expect(gen.next().done).toBe(true);
    });

    it('tests watchFetchCompany', async () => {
        const gen = watchFetchCompany();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});
