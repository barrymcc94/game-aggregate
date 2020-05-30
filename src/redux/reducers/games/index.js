import * as types from '../../types';
import {combineNormalizedListingObjs, normalizeObjectListing} from '../../../utils';
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
        filters: {}
    }
};

export const games = (state=initialState, action={type: null, payload: null}) => {
    const {type, payload} = action;
    const {ids, byId} = state;
    switch (type) {
        case types.FETCH_GAMES_STARTED:
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case types.FETCH_GAMES_SUCCEEDED:
            return {
                ...state,
                ...combineNormalizedListingObjs(
                    {ids, byId},
                    normalizeObjectListing(payload.games)
                ),
                isFetching: false,
                error: false,
                meta: {
                    ...state.meta,
                    ...payload.meta,
                    ...{
                        offset: state.meta.offset + state.meta.limit
                    }
                },
            };
        case types.FETCH_GAMES_FAILED:
            return {
                ...state,
                isFetching: false,
                error: payload.error || true,
            };
        case types.SET_GAMES_SEARCH_FILTERS:
            return {
                ...state,
                ids: [],
                meta: {
                    ...initialState.meta,
                    filters: {
                        ...state.meta.filters,
                        filter: payload.filter
                    }
                },
            };
        case types.CLEAR_GAMES_STATE:
            return initialState;
        default:
            return state;
    }
}