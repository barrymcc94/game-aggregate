import {put} from 'redux-saga/effects';
import {takeLatestById} from '../effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchFranchisesSucceeded, fetchFranchisesFailed} from '../../actions';
import {FETCH_FRANCHISES_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchFranchisesSaga({payload}) {
    const {id, query} = payload || {};
    try {
        const queryStr = objToQueryStr(query);
        const {
            results,
            error,
            limit,
            offset,
            number_of_total_results,
            status_code,
        } = yield jsonFetch(`${gbApiUrl}/api/franchises/${queryStr}`);
        if (status_code !== 1) {
            return yield put(fetchFranchisesFailed({id, error}));
        }
        yield put(
            fetchFranchisesSucceeded({
                id,
                data: results,
                query: {
                    limit,
                    offset,
                    total: number_of_total_results,
                },
            })
        );
    } catch (e) {
        yield put(fetchFranchisesFailed({id, error: true}));
    }
}

export function* watchFetchFranchises() {
    yield takeLatestById(FETCH_FRANCHISES_STARTED, fetchFranchisesSaga, 'id');
}
