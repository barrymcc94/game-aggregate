import {batch} from 'react-redux';
import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr, getDefaultGamesFilter} from '../../../utils';
import {
    fetchFranchiseSucceeded,
    fetchFranchiseFailed,
    fetchGamesStarted,
} from '../../actions';
import {FETCH_FRANCHISE_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchFranchiseSaga({payload = {}}) {
    const {guid, query} = payload;
    try {
        const queryStr = objToQueryStr(query);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/franchise/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchFranchiseFailed({guid, error}));
        }

        const gamesLimit = 100;
        const {games} = results;
        const gamesIdFilter = games.map(({id}) => id).join('|');

        yield put((dispatch) => {
            batch(() => {
                dispatch(
                    fetchFranchiseSucceeded({
                        guid,
                        data: results,
                    })
                );
                dispatch(
                    fetchGamesStarted({
                        id: `franchiseGames_${guid}`,
                        query: {
                            sort: `original_release_date:desc`,
                            filter: {
                                ...getDefaultGamesFilter(),
                                id: gamesIdFilter,
                            },
                            limit: gamesLimit,
                            offset: 0,
                        },
                    })
                );
            });
        });
    } catch (e) {
        yield put(fetchFranchiseFailed({guid, error: true}));
    }
}

export function* watchFetchFranchise() {
    yield takeLatest(FETCH_FRANCHISE_STARTED, fetchFranchiseSaga);
}
