import {
    FETCH_FRANCHISES_STARTED,
    FETCH_FRANCHISES_SUCCEEDED,
    FETCH_FRANCHISES_FAILED,
} from '../../../types';
import {
    fetchFranchisesStarted,
    fetchFranchisesSucceeded,
    fetchFranchisesFailed,
    fetchFranchises,
} from '../index';

describe('Franchises Actions', () => {
    it('tests fetchFranchisesStarted', () => {
        const action = fetchFranchisesStarted({});
        expect(action).toEqual({
            type: FETCH_FRANCHISES_STARTED,
            payload: {},
        });
    });

    it('tests fetchFranchisesSucceeded', () => {
        const action = fetchFranchisesSucceeded({});
        expect(action).toEqual({
            type: FETCH_FRANCHISES_SUCCEEDED,
            payload: {},
        });
    });

    it('tests fetchFranchisesFailed', () => {
        const action = fetchFranchisesFailed({});
        expect(action).toEqual({
            type: FETCH_FRANCHISES_FAILED,
            payload: {},
        });
    });

    it('tests fetchFranchises', async () => {
        const action = await global.testStore.dispatch(fetchFranchises({}));
        expect(action).toEqual({
            type: FETCH_FRANCHISES_STARTED,
            payload: {},
        });
    });
});
