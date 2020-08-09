import {put, takeLatest} from 'redux-saga/effects';
import {
    jsonFetch,
    objToQueryStr,
    objToFilterStr,
    getDefaultGamesFilter,
} from '../../../utils';
import {fetchCompanySucceeded, fetchCompanyFailed} from '../../actions';
import {fetchGamesStarted} from '../../actions';
import {FETCH_COMPANY_STARTED} from '../../types';
import config, {defaultGbApiDefaults} from '../../../config';
const {gbApiUrl} = config;

export function* fetchCompanySaga({payload}) {
    try {
        const {guid, queryObj} = payload || {};
        const queryStr = objToQueryStr(queryObj);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/company/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchCompanyFailed({error}));
        }

        const gamesLimit = 100;
        const {published_games, developed_games} = results;
        const gamesIdFilter = [
            ...published_games.slice(0, gamesLimit / 2),
            ...developed_games.slice(0, gamesLimit / 2),
        ]
            .map(({id}) => id)
            .join('|');

        yield put(
            fetchGamesStarted({
                queryObj: {
                    ...defaultGbApiDefaults,
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
