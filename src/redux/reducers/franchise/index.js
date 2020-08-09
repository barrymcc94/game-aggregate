import * as types from '../../types';

const initialState = {
    isFetching: false,
    error: false,
};

export const franchise = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_FRANCHISE_STARTED:
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case types.FETCH_FRANCHISE_FAILED:
            return {
                ...state,
                isFetching: false,
                error: payload.error || true,
            };
        case types.FETCH_FRANCHISE_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};
