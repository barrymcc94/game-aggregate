import {
    FETCH_COMPANY_STARTED,
    FETCH_COMPANY_SUCCEEDED,
    FETCH_COMPANY_FAILED,
} from '../../../types';
import {
    fetchCompanyStarted,
    fetchCompanySucceeded,
    fetchCompanyFailed,
    fetchCompany,
} from '../index';

describe('Company Actions', () => {
    it('tests fetchCompanyStarted', () => {
        const action = fetchCompanyStarted({});
        expect(action).toEqual({
            type: FETCH_COMPANY_STARTED,
            payload: {},
        });
    });

    it('tests fetchCompanySucceeded', () => {
        const action = fetchCompanySucceeded({});
        expect(action).toEqual({
            type: FETCH_COMPANY_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchCompanysFailed', () => {
        const action = fetchCompanyFailed({});
        expect(action).toEqual({
            type: FETCH_COMPANY_FAILED,
            payload: {},
        });
    });

    it('tests fetchCompany', async () => {
        const action = await global.testStore.dispatch(fetchCompany({}));
        expect(action).toEqual({
            type: FETCH_COMPANY_STARTED,
            payload: {},
        });
    });
});
