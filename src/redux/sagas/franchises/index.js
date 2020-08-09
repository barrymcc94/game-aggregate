import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchFranchisesSucceeded, fetchFranchisesFailed} from '../../actions';
import {FETCH_FRANCHISES_STARTED, CLEAR_FRANCHISES_STATE} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchFranchisesSaga({type, payload}) {
    if (type == CLEAR_FRANCHISES_STATE) {
        return;
    }
    try {
        const {queryObj} = payload || {};
        const queryStr = objToQueryStr(queryObj);
        const {
            results,
            error,
            limit,
            offset,
            number_of_total_results,
            status_code,
        } = yield jsonFetch(`${gbApiUrl}/api/franchises/${queryStr}`);
        if (status_code !== 1) {
            return yield put(fetchFranchisesFailed({error}));
        }
        yield put(
            fetchFranchisesSucceeded({
                data: results,
                meta: {
                    limit,
                    offset,
                    total: number_of_total_results,
                },
            })
        );
    } catch (e) {
        yield put(fetchFranchisesFailed({error: true}));
    }
}

export function* watchFetchFranchises() {
    yield takeLatest(
        [FETCH_FRANCHISES_STARTED, CLEAR_FRANCHISES_STATE],
        fetchFranchisesSaga
    );
}
