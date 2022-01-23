import {
    FETCH_COMPANIES_STARTED,
    FETCH_COMPANIES_SUCCEEDED,
    FETCH_COMPANIES_FAILED,
} from '../../../types';
import {
    fetchCompaniesStarted,
    fetchCompaniesSucceeded,
    fetchCompaniesFailed,
    fetchCompanies,
} from '../index';

describe('Companies Actions', () => {
    it('tests fetchCompaniesStarted', () => {
        const action = fetchCompaniesStarted({});
        expect(action).toEqual({
            type: FETCH_COMPANIES_STARTED,
            payload: {},
        });
    });

    it('tests fetchCompaniesSucceeded', () => {
        const action = fetchCompaniesSucceeded({});
        expect(action).toEqual({
            type: FETCH_COMPANIES_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchCompaniesFailed', () => {
        const action = fetchCompaniesFailed({});
        expect(action).toEqual({
            type: FETCH_COMPANIES_FAILED,
            payload: {},
        });
    });

    it('tests fetchCompanies', async () => {
        const action = await global.testStore.dispatch(fetchCompanies({}));
        expect(action).toEqual({
            type: FETCH_COMPANIES_STARTED,
            payload: {},
        });
    });
});
