import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchCompaniesSucceeded, fetchCompaniesFailed} from '../../actions/companies';
import {FETCH_COMPANIES_STARTED, CLEAR_COMPANIES_STATE} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchCompaniesSaga({type, payload}) {
    if (type == CLEAR_COMPANIES_STATE) {
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
        } = yield jsonFetch(`${gbApiUrl}/api/companies/${queryStr}`);
        if (status_code !== 1) {
            return yield put(fetchCompaniesFailed({error}));
        }
        yield put(fetchCompaniesSucceeded({
            data: results,
            meta: {
                limit,
                offset,
                total: number_of_total_results,
            },
        }));
    } catch(e) {
        yield put(fetchCompaniesFailed({error: true}));
    }
}

export function* watchFetchCompanies() {
    yield takeLatest([FETCH_COMPANIES_STARTED, CLEAR_COMPANIES_STATE], fetchCompaniesSaga);
}
