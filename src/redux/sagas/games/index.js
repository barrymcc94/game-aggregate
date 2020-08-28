import {put, fork, cancel, take} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr} from '../../../utils';
import {fetchGamesSucceeded, fetchGamesFailed} from '../../actions';
import {FETCH_GAMES_STARTED, CLEAR_GAMES_STATE} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchGamesSaga({type, payload}) {
    if (type == CLEAR_GAMES_STATE) {
        return;
    }
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

export const takeLatestByIdGen = (patternOrChannel, saga, ...args) =>
    function* () {
        let lastTasks = {};
        while (true) {
            const action = yield take(patternOrChannel);
            if (lastTasks[action.payload.id]) {
                yield cancel(lastTasks[action.payload.id]);
            }
            lastTasks[action.payload.id] = yield fork(
                saga,
                ...args.concat(action)
            );
        }
    };

const takeLatestById = (patternOrChannel, saga, ...args) =>
    fork(takeLatestByIdGen(patternOrChannel, saga, ...args));

export function* watchFetchGames() {
    yield takeLatestById([FETCH_GAMES_STARTED], fetchGamesSaga);
}
