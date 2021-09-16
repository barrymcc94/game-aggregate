import {
    combineNormalizedListingObjs,
    normalizeObjectListing,
} from '../../../utils';
import {defaultLimit} from '../../../config';

const mediaInitialState = {
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

export const handleFetchMediaStarted = (state, payload) => ({
    ...state,
    [payload.id]: {
        ...state[payload.id],
        ids: payload.clearState ? [] : state[payload.id]?.ids || [],
        isFetching: true,
        error: false,
        meta: {
            ...(state[payload.id]?.meta || mediaInitialState.meta),
            ...payload.meta,
            filters: {
                ...(state[payload.id]?.meta?.filters || {}),
                filter: payload.queryObj.filter,
            },
        },
    },
});

export const handleFetchMediaSucceeded = (state, payload) => {
    const {byId} = state;
    const normalizedGames = normalizeObjectListing(payload.data, 'guid');
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
};

export const handleFetchMediaFailed = (state, payload) => ({
    ...state,
    [payload.id]: {
        ...state[payload.id],
        isFetching: false,
        error: payload.error || true,
    },
});

export const handleSetMediaSearchFilters = (state, payload) =>
    payload.filter == state[payload.id].meta.filters.filter
        ? state
        : {
              ...state,
              [payload.id]: {
                  ...mediaInitialState,
                  meta: {
                      ...mediaInitialState.meta,
                      filters: {
                          ...state[payload.id].meta.filters,
                          filter: payload.filter,
                      },
                  },
              },
          };

export const handleFetchMediaItemStarted = (state, payload) => ({
    ...state,
    byId: {
        ...state.byId,
        [payload.guid]: {
            ...state.byId[payload.guid],
            isFetching: true,
            error: false,
        },
    },
});

export const handleFetchMediaItemSucceeded = (state, payload) => ({
    ...state,
    byId: {
        ...state.byId,
        [payload.data.guid]: {
            ...payload.data,
            isFetching: false,
            error: false,
        },
    },
});

export const handleFetchMediaItemFailed = (state, payload) => ({
    ...state,
    byId: {
        ...state.byId,
        [payload.guid]: {
            ...state.byId[payload.guid],
            isFetching: false,
            error: payload.error || true,
        },
    },
});
