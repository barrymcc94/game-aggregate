import {fork, all} from 'redux-saga/effects'
import {watchSetLocale} from './locale';
import {watchFetchGame} from './game';
import {watchFetchGames} from './games';
import {watchFetchCompany} from './company';

export default function* sagas() {
    yield all([
        fork(watchSetLocale),
        fork(watchFetchGame),
        fork(watchFetchGames),
        fork(watchFetchCompany),
    ])
}