import {
    FETCH_GB_API_KEY_STARTED,
    FETCH_GB_API_KEY_SUCCEEDED,
    FETCH_GB_API_KEY_FAILED,
} from '../../types';

export const fetchGBApiKeyStarted = (payload) => ({
    type: FETCH_GB_API_KEY_STARTED,
    payload,
});

export const fetchGBApiKeySucceeded = (payload) => ({
    type: FETCH_GB_API_KEY_SUCCEEDED,
    payload,
});

export const fetchGBApiKeyFailed = (payload) => ({
    type: FETCH_GB_API_KEY_FAILED,
    payload,
});

export const fetchGBApiKey = (payload) => async (dispatch) =>
    dispatch(fetchGBApiKeyStarted(payload));
