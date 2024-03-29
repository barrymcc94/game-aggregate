import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchGBApiKeySucceeded, fetchGBApiKeyFailed} from '../../actions';
import {FETCH_GB_API_KEY_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchAuthSaga({payload = {}}) {
    try {
        const {query} = payload;
        const queryStr = objToQueryStr(query);
        const {status, regToken} = yield jsonFetch(
            `${gbApiUrl}/app/myapp/get-result${queryStr}`
        );
        if (status !== 'success') {
            return yield put(fetchGBApiKeyFailed({error: true}));
        }
        localStorage.setItem('gbkey', regToken);
        yield put(
            fetchGBApiKeySucceeded({
                api_key: regToken,
            })
        );
    } catch (e) {
        yield put(fetchGBApiKeyFailed({error: true}));
    }
}

export function* watchFetchAuth() {
    yield takeLatest(FETCH_GB_API_KEY_STARTED, fetchAuthSaga);
}
