import {put} from 'redux-saga/effects';
import {takeLatestById} from '../effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchGameSucceeded, fetchGameFailed} from '../../actions';
import {FETCH_GAME_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchGameSaga({payload}) {
    try {
        const {guid, queryObj} = payload || {};
        const queryStr = objToQueryStr(queryObj);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/game/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchGameFailed({error}));
        }

        yield put(
            fetchGameSucceeded({
                data: results,
            })
        );
    } catch (e) {
        yield put(fetchGameFailed({error: true}));
    }
}

export function* watchFetchGame() {
    yield takeLatestById(FETCH_GAME_STARTED, fetchGameSaga, 'guid');
}
