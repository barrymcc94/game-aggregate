import {fork, all} from 'redux-saga/effects';
import {watchSetLocale} from './locale';
import {watchFetchAuth} from './auth';
import {watchFetchGame} from './game';
import {watchFetchGames} from './games';
import {watchFetchCompany} from './company';
import {watchFetchCompanies} from './companies';
import {watchFetchFranchise} from './franchise';
import {watchFetchFranchises} from './franchises';

export default function* sagas() {
    yield all([
        fork(watchSetLocale),
        fork(watchFetchAuth),
        fork(watchFetchGame),
        fork(watchFetchGames),
        fork(watchFetchCompany),
        fork(watchFetchCompanies),
        fork(watchFetchFranchise),
        fork(watchFetchFranchises),
    ]);
}
