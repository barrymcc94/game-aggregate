import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchGamesSucceeded, fetchGamesFailed} from '../../actions/games';
import {FETCH_GAMES_STARTED, CLEAR_GAMES_STATE} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchGamesSaga({type, payload}) {
    if (type == CLEAR_GAMES_STATE) {
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
    yield takeLatest([FETCH_GAMES_STARTED, CLEAR_GAMES_STATE], fetchGamesSaga);
}
