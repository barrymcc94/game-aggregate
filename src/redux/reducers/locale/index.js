import * as types from '../../types';

const initialState = {
    currentLocale: 'en',
    locales: ['en', 'fr'],
};

export const locale = (
    state = initialState,
    action = {type: null, payload: null}
) => {
    const {type, payload} = action;
    switch (type) {
        case types.SET_LOCALE:
            return {
                ...state,
                currentLocale: payload,
            };
        default:
            return state;
    }
};
