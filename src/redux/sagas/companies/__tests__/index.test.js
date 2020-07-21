import {fetchCompaniesSaga, watchFetchCompanies} from '../index';
import {FETCH_COMPANIES_SUCCEEDED, FETCH_COMPANIES_FAILED, CLEAR_COMPANIES_STATE} from '../../../types';

describe('Companies Sagas', () => {
    const testResults = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    beforeEach(() => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                error: "OK",
                limit: 10,
                offset: 0,
                number_of_page_results: 10,
                number_of_total_results: 100,
                status_code: 1,
                results: testResults,
                version: "1.0",
            })
        }));
    });

    it('tests fetchCompaniesSaga when expecting success', async () => {
        const gen = fetchCompaniesSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_COMPANIES_SUCCEEDED);
        expect(payload).toEqual({
            data: testResults,
            meta: {
                limit: 10,
                offset: 0,
                total: 100
            }
        });
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchCompaniesSaga when type is CLEAR_COMPANIES_STATE', async () => {
        const gen = fetchCompaniesSaga({type: CLEAR_COMPANIES_STATE});
        await gen.next().value;
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchCompaniesSaga when expecting error', async () => {
        const gen = fetchCompaniesSaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_COMPANIES_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchCompaniesSaga when expecting error response', async () => {
        jest.resetAllMocks();
        fetch.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                error: "Invalid API Key",
                limit: 10,
                offset: 0,
                number_of_page_results: 10,
                number_of_total_results: 100,
                status_code: 100,
                results: testResults,
                version: "1.0",
            })
        }));
        const gen = fetchCompaniesSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_COMPANIES_FAILED);
        expect(payload).toEqual({error: 'Invalid API Key'});
        expect(gen.next().done).toBe(true);
    })

    it('tests watchFetchCompanies', async () => {
        const gen = watchFetchCompanies();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});