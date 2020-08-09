import {
    FETCH_FRANCHISE_STARTED,
    FETCH_FRANCHISE_SUCCEEDED,
    FETCH_FRANCHISE_FAILED,
} from '../../types';

export const fetchFranchiseStarted = (payload) => ({
    type: FETCH_FRANCHISE_STARTED,
    payload,
});

export const fetchFranchiseSucceeded = (payload) => ({
    type: FETCH_FRANCHISE_SUCCEEDED,
    payload,
});

export const fetchFranchiseFailed = (payload) => ({
    type: FETCH_FRANCHISE_FAILED,
    payload,
});

export const fetchFranchise = (payload) => async (dispatch) =>
    dispatch(fetchFranchiseStarted(payload));
