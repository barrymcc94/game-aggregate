import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchFranchiseSucceeded, fetchFranchiseFailed} from '../../actions';
import {FETCH_FRANCHISE_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchFranchiseSaga({payload}) {
    try {
        const {guid, queryObj} = payload || {};
        const queryStr = objToQueryStr(queryObj);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/franchise/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchFranchiseFailed({error}));
        }
        yield put(
            fetchFranchiseSucceeded({
                data: results,
            })
        );
    } catch (e) {
        yield put(fetchFranchiseFailed({error: true}));
    }
}

export function* watchFetchFranchise() {
    yield takeLatest(FETCH_FRANCHISE_STARTED, fetchFranchiseSaga);
}
