import * as types from '../../types';

const initialState = {
    data: {},
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
                data: {},
                meta: {
                    isFetching: true,
                    error: false,
                }
            };
        case types.FETCH_GAME_FAILED:
            return {
                ...state,
                data: {},
                meta: {
                    isFetching: false,
                    error: payload.error || true,
                }
            };
        case types.FETCH_GAME_SUCCEEDED:
            return {
                ...state,
                data: payload.data,
                meta: {
                    isFetching: false,
                    error: false,
                }
            };
        default:
            return state;
    }
}