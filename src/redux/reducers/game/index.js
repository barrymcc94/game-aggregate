import * as types from '../../types';

const initialState = {
    meta: {
        isFetching: false,
        error: false
    }
};

export const game = (state=initialState, action={type: null, payload: null}) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_GAME_STARTED:
            return {
                ...state,
                meta: {
                    isFetching: true,
                    error: false,
                }
            };
        case types.FETCH_GAME_FAILED:
            return {
                ...state,
                meta: {
                    isFetching: false,
                    error: payload.error || true,
                }
            };
        case types.FETCH_GAME_SUCCEEDED:
            return {
                ...state,
                meta: {
                    isFetching: false,
                    error: false,
                }
            };
        default:
            return state;
    }
}