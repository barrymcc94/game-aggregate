import {fork, all} from 'redux-saga/effects';
import {watchSetLocale} from './locale';
import {watchFetchGame} from './game';
import {watchFetchGames} from './games';
import {watchFetchCompany} from './company';
import {watchFetchCompanies} from './companies';
import {watchFetchFranchise} from './franchise';
import {watchFetchFranchises} from './franchises';

export default function* sagas() {
    yield all([
        fork(watchSetLocale),
        fork(watchFetchGame),
        fork(watchFetchGames),
        fork(watchFetchCompany),
        fork(watchFetchCompanies),
        fork(watchFetchFranchise),
        fork(watchFetchFranchises),
    ]);
}
