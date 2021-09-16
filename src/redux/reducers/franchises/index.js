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

export const franchises = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_FRANCHISES_STARTED:
            return handleFetchMediaStarted(state, payload);
        case types.FETCH_FRANCHISES_SUCCEEDED:
            return handleFetchMediaSucceeded(state, payload);
        case types.FETCH_FRANCHISES_FAILED:
            return handleFetchMediaFailed(state, payload);
        case types.SET_FRANCHISES_SEARCH_FILTERS:
            return handleSetMediaSearchFilters(state, payload);
        case types.FETCH_FRANCHISE_STARTED:
            return handleFetchMediaItemStarted(state, payload);
        case types.FETCH_FRANCHISE_SUCCEEDED:
            return handleFetchMediaItemSucceeded(state, payload);
        case types.FETCH_FRANCHISE_FAILED:
            return handleFetchMediaItemFailed(state, payload);
        default:
            return state;
    }
};
