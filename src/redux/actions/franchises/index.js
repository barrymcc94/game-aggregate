import {
    FETCH_FRANCHISES_STARTED,
    FETCH_FRANCHISES_SUCCEEDED,
    FETCH_FRANCHISES_FAILED,
    SET_FRANCHISES_SEARCH_FILTERS,
    CLEAR_FRANCHISES_STATE,
} from '../../types';

export const fetchFranchisesStarted = (payload) => ({
    type: FETCH_FRANCHISES_STARTED,
    payload,
});

export const fetchFranchisesSucceeded = (payload) => ({
    type: FETCH_FRANCHISES_SUCCEEDED,
    payload,
});

export const fetchFranchisesFailed = (payload) => ({
    type: FETCH_FRANCHISES_FAILED,
    payload,
});

export const fetchFranchises = (payload) => async (dispatch) =>
    dispatch(fetchFranchisesStarted(payload));

export const setFranchisesSearchFilters = (payload) => async (dispatch) =>
    dispatch({
        type: SET_FRANCHISES_SEARCH_FILTERS,
        payload,
    });

export const clearFranchisesState = (payload) => async (dispatch) =>
    dispatch({
        type: CLEAR_FRANCHISES_STATE,
        payload,
    });
