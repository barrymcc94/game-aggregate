import * as types from '../../types';
import {
    combineNormalizedListingObjs,
    normalizeObjectListing,
} from '../../../utils';
import {defaultLimit} from '../../../config';

const gamesInitialState = {
    ids: [],
    isFetching: false,
    error: false,
    meta: {
        offset: 0,
        limit: defaultLimit,
        total: -1,
        filters: {},
    },
};

const initialState = {
    byId: {},
};

export const games = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    const {byId} = state;
    switch (type) {
        case types.FETCH_GAMES_STARTED:
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    ids: payload.clearState ? [] : state[payload.id]?.ids || [],
                    isFetching: true,
                    error: false,
                    meta: {
                        ...(state[payload.id]?.meta || gamesInitialState.meta),
                        ...payload.meta,
                        filters: {
                            ...(state[payload.id]?.meta?.filters || {}),
                            filter: payload.queryObj.filter,
                        },
                    },
                },
            };
        case types.FETCH_GAMES_SUCCEEDED:
            const normalizedGames = normalizeObjectListing(
                payload.data,
                'guid'
            );
            const normalizedListing = combineNormalizedListingObjs(
                {ids: state[payload.id]?.ids || [], byId: normalizedGames.byId},
                {ids: normalizedGames.ids, byId}
            );
            return {
                ...state,
                byId: normalizedListing.byId,
                [payload.id]: {
                    ...state[payload.id],
                    ids: normalizedListing.ids,
                    isFetching: false,
                    error: false,
                    meta: {
                        ...state[payload.id].meta,
                        ...payload.meta,
                        ...{
                            offset:
                                state[payload.id].meta.offset +
                                state[payload.id].meta.limit,
                        },
                    },
                },
            };
        case types.FETCH_GAMES_FAILED:
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    isFetching: false,
                    error: payload.error || true,
                },
            };
        case types.SET_GAMES_SEARCH_FILTERS:
            return payload.filter == state[payload.id].meta.filters.filter
                ? state
                : {
                      ...state,
                      [payload.id]: {
                          ...gamesInitialState,
                          meta: {
                              ...gamesInitialState.meta,
                              filters: {
                                  ...state[payload.id].meta.filters,
                                  filter: payload.filter,
                              },
                          },
                      },
                  };
        case types.FETCH_GAME_STARTED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload.guid]: {
                        ...state.byId[payload.guid],
                        isFetching: true,
                        error: false,
                    },
                },
            };
        case types.FETCH_GAME_FAILED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload.guid]: {
                        ...state.byId[payload.guid],
                        isFetching: false,
                        error: payload.error || true,
                    },
                },
            };
        case types.FETCH_GAME_SUCCEEDED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload.data.guid]: {
                        ...payload.data,
                        isFetching: false,
                        error: false,
                    },
                },
            };
        default:
            return state;
    }
};
