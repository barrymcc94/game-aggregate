import {
    FETCH_GAME_STARTED,
    FETCH_GAME_SUCCEEDED,
    FETCH_GAME_FAILED,
    FETCH_GAMES_STARTED,
    FETCH_GAMES_SUCCEEDED,
    FETCH_GAMES_FAILED,
} from '../../types';

export const fetchGameStarted = (payload) => ({
    type: FETCH_GAME_STARTED,
    payload,
});

export const fetchGameSucceeded = (payload) => ({
    type: FETCH_GAME_SUCCEEDED,
    payload,
});

export const fetchGameFailed = (payload) => ({
    type: FETCH_GAME_FAILED,
    payload,
});

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

export const fetchGame = (payload) => async (dispatch) =>
    dispatch(fetchGameStarted(payload));

export const fetchGames = (payload) => async (dispatch) =>
    dispatch(fetchGamesStarted(payload));
