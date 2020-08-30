import * as types from '../../types';

const initialState = {
    giantbomb: {
        api_key:
            process.env.NODE_ENV === 'development'
                ? process.env.GB_API_KEY
                : null,
        isFetching: false,
        error: false,
    },
};

export const auth = (
    state = initialState,
    action = {type: null, payload: {}}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_GB_API_KEY_STARTED:
            return {
                ...state,
                giantbomb: {
                    ...state.giantbomb,
                    api_key: null,
                    isFetching: true,
                    error: false,
                },
            };
        case types.FETCH_GB_API_KEY_FAILED:
            return {
                ...state,
                giantbomb: {
                    ...state.giantbomb,
                    api_key: null,
                    isFetching: false,
                    error: true,
                },
            };
        case types.FETCH_GB_API_KEY_SUCCEEDED:
            return {
                ...state,
                giantbomb: {
                    ...state.giantbomb,
                    api_key: payload.api_key,
                    isFetching: false,
                    error: false,
                },
            };
        default:
            return state;
    }
};
