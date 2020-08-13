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

export const games = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    const {ids, byId} = state;
    switch (type) {
        case types.FETCH_GAMES_STARTED:
            return {
                ...state,
                isFetching: true,
                error: false,
                meta: {
                    ...state.meta,
                    ...payload.meta,
                    filters: {
                        ...state.meta.filters,
                        filter: payload.queryObj.filter,
                    },
                },
            };
        case types.FETCH_GAMES_SUCCEEDED:
            const normalizedGames = normalizeObjectListing(
                payload.data,
                'guid'
            );
            return {
                ...state,
                ...combineNormalizedListingObjs(
                    {ids, byId: normalizedGames.byId},
                    {ids: normalizedGames.ids, byId}
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
                        filter: payload.filter,
                    },
                },
            };
        case types.CLEAR_GAMES_STATE:
            return {
                ...initialState,
                byId,
            };
        case types.FETCH_GAME_SUCCEEDED:
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
