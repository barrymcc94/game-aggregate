import * as types from '../../types';
import {
    handleFetchMediaStarted,
    handleFetchMediaSucceeded,
    handleFetchMediaFailed,
    handleFetchMediaItemStarted,
    handleFetchMediaItemSucceeded,
    handleFetchMediaItemFailed,
} from '../utils';

const initialState = {
    byId: {},
};

export const games = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_GAMES_STARTED:
            return handleFetchMediaStarted(state, payload);
        case types.FETCH_GAMES_SUCCEEDED:
            return handleFetchMediaSucceeded(state, payload);
        case types.FETCH_GAMES_FAILED:
            return handleFetchMediaFailed(state, payload);
        case types.FETCH_GAME_STARTED:
            return handleFetchMediaItemStarted(state, payload);
        case types.FETCH_GAME_SUCCEEDED:
            return handleFetchMediaItemSucceeded(state, payload);
        case types.FETCH_GAME_FAILED:
            return handleFetchMediaItemFailed(state, payload);
        default:
            return state;
    }
};
