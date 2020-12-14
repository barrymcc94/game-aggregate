import {put, take, takeLatest} from 'redux-saga/effects';
import {
    jsonFetch,
    objToQueryStr,
    objToFilterStr,
    getDefaultGamesFilter,
} from '../../../utils';
import {
    fetchFranchiseSucceeded,
    fetchFranchiseFailed,
    fetchGamesStarted,
} from '../../actions';
import {FETCH_FRANCHISE_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchFranchiseSaga({payload = {}}) {
    try {
        const {guid, queryObj} = payload;
        const queryStr = objToQueryStr(queryObj);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/franchise/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchFranchiseFailed({error}));
        }
        yield put(
            fetchFranchiseSucceeded({
                data: results,
            })
        );

        const gamesLimit = 100;
        const {games} = results;
        const gamesIdFilter = games.map(({id}) => id).join('|');

        yield put(
            fetchGamesStarted({
                id: `franchiseGames_${guid}`,
                queryObj: {
                    sort: `original_release_date:desc`,
                    filter: objToFilterStr({
                        ...getDefaultGamesFilter(),
                        id: gamesIdFilter,
                    }),
                    limit: gamesLimit,
                    offset: 0,
                },
                meta: {limit: gamesLimit},
            })
        );
    } catch (e) {
        yield put(fetchFranchiseFailed({error: true}));
    }
}

export function* watchFetchFranchise() {
    yield takeLatest(FETCH_FRANCHISE_STARTED, fetchFranchiseSaga);
}
