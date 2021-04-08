import {
    FETCH_COMPANIES_STARTED,
    FETCH_COMPANIES_SUCCEEDED,
    FETCH_COMPANIES_FAILED,
    SET_COMPANIES_SEARCH_FILTERS,
} from '../../types';

export const fetchCompaniesStarted = (payload) => ({
    type: FETCH_COMPANIES_STARTED,
    payload,
});

export const fetchCompaniesSucceeded = (payload) => ({
    type: FETCH_COMPANIES_SUCCEEDED,
    payload,
});

export const fetchCompaniesFailed = (payload) => ({
    type: FETCH_COMPANIES_FAILED,
    payload,
});

export const fetchCompanies = (payload) => async (dispatch) =>
    dispatch(fetchCompaniesStarted(payload));

export const setCompaniesSearchFilters = (payload) => async (dispatch) =>
    dispatch({
        type: SET_COMPANIES_SEARCH_FILTERS,
        payload,
    });
