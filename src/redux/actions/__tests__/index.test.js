import * as types from '../../types';
import * as actions from '../';

describe('generic actions', () => {
    const actionsList = [
        {
            action: actions.fetchGamesStarted,
            type: types.FETCH_GAMES_STARTED,
        },
        {
            action: actions.fetchGamesSucceeded,
            type: types.FETCH_GAMES_SUCCEEDED,
        },
        {
            action: actions.fetchGamesFailed,
            type: types.FETCH_GAMES_FAILED,
        },
        {
            action: actions.fetchGameStarted,
            type: types.FETCH_GAME_STARTED,
        },
        {
            action: actions.fetchGameSucceeded,
            type: types.FETCH_GAME_SUCCEEDED,
        },
        {
            action: actions.fetchGameFailed,
            type: types.FETCH_GAME_FAILED,
        },
        {
            action: actions.fetchCompaniesStarted,
            type: types.FETCH_COMPANIES_STARTED,
        },
        {
            action: actions.fetchCompaniesSucceeded,
            type: types.FETCH_COMPANIES_SUCCEEDED,
        },
        {
            action: actions.fetchCompaniesFailed,
            type: types.FETCH_COMPANIES_FAILED,
        },
        {
            action: actions.fetchCompanyStarted,
            type: types.FETCH_COMPANY_STARTED,
        },
        {
            action: actions.fetchCompanySucceeded,
            type: types.FETCH_COMPANY_SUCCEEDED,
        },
        {
            action: actions.fetchCompanyFailed,
            type: types.FETCH_COMPANY_FAILED,
        },
        {
            action: actions.fetchFranchisesStarted,
            type: types.FETCH_FRANCHISES_STARTED,
        },
        {
            action: actions.fetchFranchisesSucceeded,
            type: types.FETCH_FRANCHISES_SUCCEEDED,
        },
        {
            action: actions.fetchFranchisesFailed,
            type: types.FETCH_FRANCHISES_FAILED,
        },
        {
            action: actions.fetchFranchiseStarted,
            type: types.FETCH_FRANCHISE_STARTED,
        },
        {
            action: actions.fetchFranchiseSucceeded,
            type: types.FETCH_FRANCHISE_SUCCEEDED,
        },
        {
            action: actions.fetchFranchiseFailed,
            type: types.FETCH_FRANCHISE_FAILED,
        },
        {
            action: actions.fetchGBApiKeyStarted,
            type: types.FETCH_GB_API_KEY_STARTED,
        },
        {
            action: actions.fetchGBApiKeySucceeded,
            type: types.FETCH_GB_API_KEY_SUCCEEDED,
        },
        {
            action: actions.fetchGBApiKeyFailed,
            type: types.FETCH_GB_API_KEY_FAILED,
        },
        {
            action: actions.setLocale,
            type: types.SET_LOCALE,
        },
    ];

    it.each(actionsList)(
        'verifies the $action action outputs the action data in the correct format',
        ({action, type}) => {
            expect(action({})).toEqual({type, payload: {}});
        }
    );
});

describe('dispath actions', () => {
    const actionsList = [
        {
            action: actions.fetchGame,
            type: types.FETCH_GAME_STARTED,
        },
        {
            action: actions.fetchGames,
            type: types.FETCH_GAMES_STARTED,
        },
        {
            action: actions.fetchCompany,
            type: types.FETCH_COMPANY_STARTED,
        },
        {
            action: actions.fetchCompanies,
            type: types.FETCH_COMPANIES_STARTED,
        },
        {
            action: actions.fetchFranchise,
            type: types.FETCH_FRANCHISE_STARTED,
        },
        {
            action: actions.fetchFranchises,
            type: types.FETCH_FRANCHISES_STARTED,
        },
        {
            action: actions.fetchGBApiKey,
            type: types.FETCH_GB_API_KEY_STARTED,
        },
        {
            action: actions.changeLocale,
            type: types.SET_LOCALE,
        },
    ];
    it.each(actionsList)(
        'verifies the $action action dispatches data in the correct format',
        async ({action, type}) => {
            expect(await global.testStore.dispatch(action({}))).toEqual({
                type,
                payload: {},
            });
        }
    );
});
