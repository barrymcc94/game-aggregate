import {
    FETCH_FRANCHISES_STARTED,
    FETCH_FRANCHISES_SUCCEEDED,
    FETCH_FRANCHISES_FAILED,
    SET_FRANCHISES_SEARCH_FILTERS,
} from '../../../types';
import {
    fetchFranchisesStarted,
    fetchFranchisesSucceeded,
    fetchFranchisesFailed,
    fetchFranchises,
    setFranchisesSearchFilters,
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

    it('tests setFranchisesSearchFilters', async () => {
        const action = await global.testStore.dispatch(
            setFranchisesSearchFilters({})
        );
        expect(action).toEqual({
            type: SET_FRANCHISES_SEARCH_FILTERS,
            payload: {},
        });
    });
});
