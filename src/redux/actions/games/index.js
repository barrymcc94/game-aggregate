import {FETCH_GAMES_STARTED, FETCH_GAMES_SUCCEEDED, FETCH_GAMES_FAILED} from '../../types';

export const fetchGamesStarted = (payload) => ({
    type: FETCH_GAMES_STARTED,
    payload,
})

export const fetchGamesSucceeded = (payload) => ({
    type: FETCH_GAMES_SUCCEEDED,
    payload,
})

export const fetchGamesFailed = (payload) => ({
    type: FETCH_GAMES_FAILED,
    payload,
})

export const fetchGames = (payload) => async (dispatch) => {
    return dispatch(fetchGamesStarted(payload));
}