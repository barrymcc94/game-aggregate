import {takeLatest} from 'redux-saga/effects';
import {SET_LOCALE} from '../../types';

export function* setLocaleSaga({payload}) {
    if (!payload) {
        return;
    }
    yield (document.documentElement.lang = payload);
}

export function* watchSetLocale() {
    yield takeLatest(SET_LOCALE, setLocaleSaga);
}
