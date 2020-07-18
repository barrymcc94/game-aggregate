import {
    FETCH_COMPANY_STARTED,
    FETCH_COMPANY_SUCCEEDED,
    FETCH_COMPANY_FAILED,
} from '../../types';

export const fetchCompanyStarted = (payload) => ({
    type: FETCH_COMPANY_STARTED,
    payload,
})

export const fetchCompanySucceeded = (payload) => ({
    type: FETCH_COMPANY_SUCCEEDED,
    payload,
})

export const fetchCompanyFailed = (payload) => ({
    type: FETCH_COMPANY_FAILED,
    payload,
})

export const fetchCompany = (payload) => async (dispatch) => (
    dispatch(fetchCompanyStarted(payload))
)