import {SET_LOCALE} from '../../types';

export const setLocale = (payload) => ({
    type: SET_LOCALE,
    payload,
})

export const changeLocale = (payload) => async (dispatch) => {
    return dispatch(setLocale(payload))
}