import * as types from '../../types';
import {
    combineNormalizedListingObjs,
    normalizeObjectListing,
} from '../../../utils';
import {defaultLimit} from '../../../config';

const initialState = {
    ids: [],
    byId: {},
    isFetching: false,
    error: false,
    meta: {
        offset: 0,
        limit: defaultLimit,
        total: -1,
        filters: {},
    },
};

export const companies = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    const {ids, byId} = state;
    switch (type) {
        case types.FETCH_COMPANIES_STARTED:
            return {
                ...state,
                isFetching: true,
                error: false,
                meta: {
                    ...state.meta,
                    ...payload.meta,
                },
            };
        case types.FETCH_COMPANIES_SUCCEEDED:
            const normalizedCompanies = normalizeObjectListing(
                payload.data,
                'guid'
            );
            return {
                ...state,
                ...combineNormalizedListingObjs(
                    {ids, byId: normalizedCompanies.byId},
                    {ids: normalizedCompanies.ids, byId}
                ),
                isFetching: false,
                error: false,
                meta: {
                    ...state.meta,
                    ...payload.meta,
                    ...{
                        offset: state.meta.offset + state.meta.limit,
                    },
                },
            };
        case types.FETCH_COMPANIES_FAILED:
            return {
                ...state,
                isFetching: false,
                error: payload.error || true,
            };
        case types.SET_COMPANIES_SEARCH_FILTERS:
            return {
                ...state,
                ids: [],
                meta: {
                    ...initialState.meta,
                    filters: {
                        ...state.meta.filters,
                        filter: payload.filter,
                    },
                },
            };
        case types.CLEAR_COMPANIES_STATE:
            return {
                ...initialState,
                byId,
            };
        case types.FETCH_COMPANY_SUCCEEDED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload.data.guid]: payload.data,
                },
            };
        default:
            return state;
    }
};
