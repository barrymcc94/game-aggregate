import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchCompanySucceeded, fetchCompanyFailed} from '../../actions/company';
import {FETCH_COMPANY_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchCompanySaga({payload}) {
    try {
        const {guid, queryObj} = payload || {};
        const queryStr = objToQueryStr(queryObj);
        const {
            results,
            error,
            status_code,
        } = yield jsonFetch(`${gbApiUrl}/api/company/${guid}/${queryStr}`);
        if (status_code !== 1) {
            return yield put(fetchCompanyFailed({error}));
        }

        yield put(fetchCompanySucceeded({
            data: results,
        }));
    } catch(e) {
        yield put(fetchCompanyFailed({error: true}));
    }
}

export function* watchFetchCompany() {
    yield takeLatest(FETCH_COMPANY_STARTED, fetchCompanySaga);
}