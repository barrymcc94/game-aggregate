import {put} from 'redux-saga/effects';
import {takeLatestById} from '../effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchCompaniesSucceeded, fetchCompaniesFailed} from '../../actions';
import {FETCH_COMPANIES_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchCompaniesSaga({payload}) {
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
        } = yield jsonFetch(`${gbApiUrl}/api/companies/${queryStr}`);
        if (status_code !== 1) {
            return yield put(fetchCompaniesFailed({id, error}));
        }
        yield put(
            fetchCompaniesSucceeded({
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
        yield put(fetchCompaniesFailed({id, error: true}));
    }
}

export function* watchFetchCompanies() {
    yield takeLatestById(FETCH_COMPANIES_STARTED, fetchCompaniesSaga, 'id');
}
