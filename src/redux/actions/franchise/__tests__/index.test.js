import {
    FETCH_FRANCHISE_STARTED,
    FETCH_FRANCHISE_SUCCEEDED,
    FETCH_FRANCHISE_FAILED,
} from '../../../types';
import {
    fetchFranchiseStarted,
    fetchFranchiseSucceeded,
    fetchFranchiseFailed,
    fetchFranchise,
} from '../index';

describe('Franchise Actions', () => {
    it('tests fetchFranchiseStarted', () => {
        const action = fetchFranchiseStarted({});
        expect(action).toEqual({
            type: FETCH_FRANCHISE_STARTED,
            payload: {},
        });
    });

    it('tests fetchFranchiseSucceeded', () => {
        const action = fetchFranchiseSucceeded({});
        expect(action).toEqual({
            type: FETCH_FRANCHISE_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchFranchisesFailed', () => {
        const action = fetchFranchiseFailed({});
        expect(action).toEqual({
            type: FETCH_FRANCHISE_FAILED,
            payload: {},
        });
    });

    it('tests fetchFranchise', async () => {
        const action = await global.testStore.dispatch(fetchFranchise({}));
        expect(action).toEqual({
            type: FETCH_FRANCHISE_STARTED,
            payload: {},
        });
    });
});
