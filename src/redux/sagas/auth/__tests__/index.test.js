import {fetchAuthSaga, watchFetchAuth} from '../index';
import {
    FETCH_GB_API_KEY_SUCCEEDED,
    FETCH_GB_API_KEY_FAILED,
} from '../../../types';

describe('Auth Sagas', () => {
    beforeEach(() => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 'success',
                        regToken: 'apiKey',
                    }),
            })
        );
    });

    it('tests fetchAuthSaga when expecting success', async () => {
        const gen = fetchAuthSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_GB_API_KEY_SUCCEEDED);
        expect(payload).toEqual({api_key: 'apiKey'});
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchAuthSaga when expecting error', async () => {
        const gen = fetchAuthSaga({});
        await gen.next().value;
        const {type, payload} = gen.throw(new Error()).value.payload.action;
        expect(type).toBe(FETCH_GB_API_KEY_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchAuthSaga when expecting error response', async () => {
        jest.resetAllMocks();
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 'Fail',
                    }),
            })
        );
        const gen = fetchAuthSaga({payload: {}});
        const data = await gen.next().value;
        const {type, payload} = await gen.next(data).value.payload.action;
        expect(type).toBe(FETCH_GB_API_KEY_FAILED);
        expect(payload).toEqual({error: true});
        expect(gen.next().done).toBe(true);
    });

    it('tests fetchAuthSaga', async () => {
        const gen = watchFetchAuth({payload: {query: {}}});
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});
