import {batch} from 'react-redux';
import {put, takeLatest} from 'redux-saga/effects';
import {jsonFetch, objToQueryStr, getDefaultGamesFilter} from '../../../utils';
import {
    fetchCompanySucceeded,
    fetchCompanyFailed,
    fetchGamesStarted,
} from '../../actions';
import {FETCH_COMPANY_STARTED} from '../../types';
import config from '../../../config';
const {gbApiUrl} = config;

export function* fetchCompanySaga({payload = {}}) {
    const {guid, query} = payload;
    try {
        const queryStr = objToQueryStr(query);
        const {results, error, status_code} = yield jsonFetch(
            `${gbApiUrl}/api/company/${guid}/${queryStr}`
        );
        if (status_code !== 1) {
            return yield put(fetchCompanyFailed({guid, error}));
        }

        const gamesLimit = 100;
        const {published_games, developed_games} = results;
        yield put((dispatch) => {
            batch(() => {
                dispatch(
                    fetchGamesStarted({
                        id: `companyPublishedGames_${guid}`,
                        query: {
                            sort: `original_release_date:desc`,
                            filter: {
                                ...getDefaultGamesFilter(),
                                id: published_games.map(({id}) => id).join('|'),
                            },
                            limit: gamesLimit,
                            offset: 0,
                        },
                    })
                );
                dispatch(
                    fetchGamesStarted({
                        id: `companyDevelopedGames_${guid}`,
                        query: {
                            sort: `original_release_date:desc`,
                            filter: {
                                ...getDefaultGamesFilter(),
                                id: developed_games.map(({id}) => id).join('|'),
                            },
                            limit: gamesLimit,
                            offset: 0,
                        },
                    })
                );
                dispatch(
                    fetchCompanySucceeded({
                        guid,
                        data: results,
                    })
                );
            });
        });
    } catch (e) {
        yield put(fetchCompanyFailed({guid, error: true}));
    }
}

export function* watchFetchCompany() {
    yield takeLatest(FETCH_COMPANY_STARTED, fetchCompanySaga);
}
