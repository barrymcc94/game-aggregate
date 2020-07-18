import {fetchCompanySaga, watchFetchCompany} from '../index';
import {FETCH_COMPANY_SUCCEEDED, FETCH_COMPANY_FAILED} from '../../../types';

describe('Company Sagas', () => {
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

    it('tests fetchCompanySaga when expecting success', async () => {
        const gen = fetchCompanySaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_COMPANY_SUCCEEDED);
        expect(payload).toEqual({data: {id: 1}});
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchCompanySaga when expecting error', async () => {
        const gen = fetchCompanySaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_COMPANY_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    })

    it('tests fetchCompanySaga when expecting error response', async () => {
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
        const gen = fetchCompanySaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_COMPANY_FAILED);
        expect(payload).toEqual({error: 'Invalid API Key'});
        expect(gen.next().done).toBe(true);
    })

    it('tests watchFetchCompany', async () => {
        const gen = watchFetchCompany();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});