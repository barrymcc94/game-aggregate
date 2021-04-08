import {
    FETCH_GAMES_STARTED,
    FETCH_GAMES_SUCCEEDED,
    FETCH_GAMES_FAILED,
    SET_GAMES_SEARCH_FILTERS,
} from '../../types';

export const fetchGamesStarted = (payload) => ({
    type: FETCH_GAMES_STARTED,
    payload,
});

export const fetchGamesSucceeded = (payload) => ({
    type: FETCH_GAMES_SUCCEEDED,
    payload,
});

export const fetchGamesFailed = (payload) => ({
    type: FETCH_GAMES_FAILED,
    payload,
});

export const fetchGames = (payload) => async (dispatch) =>
    dispatch(fetchGamesStarted(payload));

export const setGamesSearchFilters = (payload) => async (dispatch) =>
    dispatch({
        type: SET_GAMES_SEARCH_FILTERS,
        payload,
    });
