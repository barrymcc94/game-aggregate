import {
    FETCH_GAME_STARTED,
    FETCH_GAME_SUCCEEDED,
    FETCH_GAME_FAILED,
} from '../../types';

export const fetchGameStarted = (payload) => ({
    type: FETCH_GAME_STARTED,
    payload,
})

export const fetchGameSucceeded = (payload) => ({
    type: FETCH_GAME_SUCCEEDED,
    payload,
})

export const fetchGameFailed = (payload) => ({
    type: FETCH_GAME_FAILED,
    payload,
})

export const fetchGame = (payload) => async (dispatch) => (
    dispatch(fetchGameStarted(payload))
)