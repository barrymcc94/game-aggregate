import {fork, all} from 'redux-saga/effects'
import {watchSetLocale} from './locale';
import {watchFetchGames} from './games';

export default function* sagas() {
    yield all([
        fork(watchSetLocale),
        fork(watchFetchGames),
    ])
}