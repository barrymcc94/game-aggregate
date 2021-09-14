import {put} from 'redux-saga/effects';
import {takeLatestById} from '../effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchGamesSucceeded, fetchGamesFailed} from '../../actions';
import {FETCH_GAMES_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchGamesSaga({payload}) {
    const {id, queryObj} = payload || {};
    try {
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
            return yield put(fetchGamesFailed({id, error}));
        }
        yield put(
            fetchGamesSucceeded({
                id,
                data: results,
                meta: {
                    limit,
                    offset,
                    total: number_of_total_results,
                },
            })
        );
    } catch (e) {
        yield put(fetchGamesFailed({id, error: true}));
    }
}

export function* watchFetchGames() {
    yield takeLatestById(FETCH_GAMES_STARTED, fetchGamesSaga, 'id');
}
