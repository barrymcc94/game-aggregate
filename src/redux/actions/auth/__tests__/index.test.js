import {
    FETCH_GB_API_KEY_STARTED,
    FETCH_GB_API_KEY_SUCCEEDED,
    FETCH_GB_API_KEY_FAILED,
} from '../../../types';
import {
    fetchGBApiKeyStarted,
    fetchGBApiKeySucceeded,
    fetchGBApiKeyFailed,
    fetchGBApiKey,
} from '../index';

describe('API Key Actions', () => {
    it('tests fetchGBApiKeyStarted', () => {
        const action = fetchGBApiKeyStarted({});
        expect(action).toEqual({
            type: FETCH_GB_API_KEY_STARTED,
            payload: {},
        });
    });

    it('tests fetchGBApiKeySucceeded', () => {
        const action = fetchGBApiKeySucceeded({});
        expect(action).toEqual({
            type: FETCH_GB_API_KEY_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchGBApiKeyFailed', () => {
        const action = fetchGBApiKeyFailed({});
        expect(action).toEqual({
            type: FETCH_GB_API_KEY_FAILED,
            payload: {},
        });
    });

    it('tests fetchGBApiKey', async () => {
        const action = await global.testStore.dispatch(fetchGBApiKey({}));
        expect(action).toEqual({
            type: FETCH_GB_API_KEY_STARTED,
            payload: {},
        });
    });
});
