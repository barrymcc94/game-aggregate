import {fork, all} from 'redux-saga/effects'
import {watchSetLocale} from './locale';

export default function* sagas() {
    yield all([
        fork(watchSetLocale),
    ])
}