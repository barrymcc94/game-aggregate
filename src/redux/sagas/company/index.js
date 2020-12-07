import {put, takeLatest} from 'redux-saga/effects';
import {
    jsonFetch,
    objToQueryStr,
    objToFilterStr,
    getDefaultGamesFilter,
} from '../../../utils';
import {
    fetchCompanySucceeded,
    fetchCompanyFailed,
    fetchGamesStarted,
} from '../../actions';
import {FETCH_COMPANY_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchCompanySaga({payload = {}}) {
    try {
        const {guid, queryObj} = payload;
        const queryStr = objToQueryStr(queryObj);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/company/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchCompanyFailed({error}));
        }

        const gamesLimit = 100;
        const {published_games, developed_games} = results;

        yield put(
            fetchGamesStarted({
                id: `companyPublishedGames_${guid}`,
                queryObj: {
                    sort: `original_release_date:desc`,
                    filter: objToFilterStr({
                        ...getDefaultGamesFilter(),
                        id: published_games.map(({id}) => id).join('|'),
                    }),
                    limit: gamesLimit,
                    offset: 0,
                },
                meta: {limit: gamesLimit},
            })
        );
        yield put(
            fetchGamesStarted({
                id: `companyDevelopedGames_${guid}`,
                queryObj: {
                    sort: `original_release_date:desc`,
                    filter: objToFilterStr({
                        ...getDefaultGamesFilter(),
                        id: developed_games.map(({id}) => id).join('|'),
                    }),
                    limit: gamesLimit,
                    offset: 0,
                },
                meta: {limit: gamesLimit},
            })
        );

        yield put(
            fetchCompanySucceeded({
                data: results,
            })
        );
    } catch (e) {
        yield put(fetchCompanyFailed({error: true}));
    }
}

export function* watchFetchCompany() {
    yield takeLatest(FETCH_COMPANY_STARTED, fetchCompanySaga);
}
