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

export const franchises = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    const {ids, byId} = state;
    switch (type) {
        case types.FETCH_FRANCHISES_STARTED:
            return {
                ...state,
                ids: payload.clearState ? [] : ids,
                isFetching: true,
                error: false,
                meta: {
                    ...state.meta,
                    ...payload.meta,
                },
            };
        case types.FETCH_FRANCHISES_SUCCEEDED:
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
        case types.FETCH_FRANCHISES_FAILED:
            return {
                ...state,
                isFetching: false,
                error: payload.error || true,
            };
        case types.SET_FRANCHISES_SEARCH_FILTERS:
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
        case types.FETCH_FRANCHISE_SUCCEEDED:
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
