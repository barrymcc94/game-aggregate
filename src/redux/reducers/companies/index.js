import * as types from '../../types';
import {
    handleFetchMediaStarted,
    handleFetchMediaSucceeded,
    handleFetchMediaFailed,
    handleSetMediaSearchFilters,
    handleFetchMediaItemStarted,
    handleFetchMediaItemSucceeded,
    handleFetchMediaItemFailed,
} from '../utils';

const initialState = {
    byId: {},
};

export const companies = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_COMPANIES_STARTED:
            return handleFetchMediaStarted(state, payload);
        case types.FETCH_COMPANIES_SUCCEEDED:
            return handleFetchMediaSucceeded(state, payload);
        case types.FETCH_COMPANIES_FAILED:
            return handleFetchMediaFailed(state, payload);
        case types.SET_COMPANIES_SEARCH_FILTERS:
            return handleSetMediaSearchFilters(state, payload);
        case types.FETCH_COMPANY_STARTED:
            return handleFetchMediaItemStarted(state, payload);
        case types.FETCH_COMPANY_SUCCEEDED:
            return handleFetchMediaItemSucceeded(state, payload);
        case types.FETCH_COMPANY_FAILED:
            return handleFetchMediaItemFailed(state, payload);
        default:
            return state;
    }
};
