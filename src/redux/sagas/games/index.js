import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchGamesSucceeded, fetchGamesFailed} from '../../actions/games';
import {FETCH_GAMES_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchGamesSaga({payload}) {
    try {
        const queryStr = objToQueryStr(payload);
        const {
            results,
            error,
            limit,
            offset,
            number_of_total_results,
            status_code,
        } = yield jsonFetch(`${gbApiUrl}/api/games/${queryStr}`);
        if (status_code !== 1) {
            return yield put(fetchGamesFailed({error}));
        }
        yield put(fetchGamesSucceeded({
            games: results,
            meta: {
                limit,
                offset,
                total: number_of_total_results,
            },
        }));
    } catch(e) {
        yield put(fetchGamesFailed({error: true}));
    }
}

export function* watchFetchGames() {
    yield takeLatest(FETCH_GAMES_STARTED, fetchGamesSaga);
}
