import * as types from '../../types';

const initialState = {
    isFetching: false,
    error: false,
};

export const company = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_COMPANY_STARTED:
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case types.FETCH_COMPANY_FAILED:
            return {
                ...state,
                isFetching: false,
                error: payload.error || true,
            };
        case types.FETCH_COMPANY_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};
