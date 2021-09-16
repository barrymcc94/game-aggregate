import {selectFranchise, selectFranchises} from '../index';

describe('Franchise Selector', () => {
    it('simulates selectFranchise', () => {
        const state = {
            franchises: {
                byId: {
                    id1: {id: 1},
                },
            },
        };
        const expectedResult = {id: 1};
        const result = selectFranchise(state, 'id1');
        expect(result).toEqual(expectedResult);
    });
});

describe('Games Selector', () => {
    it('simulates selectGames 1', () => {
        const state = {
            franchises: {
                ids: [],
                byId: {},
                isFetching: false,
            },
        };
        const expectedResult = [];
        const result = selectFranchises(state);
        expect(result).toEqual(expectedResult);
    });

    it('simulates selectGames 2', () => {
        const state = {
            franchises: {
                byId: {
                    1: {
                        id: 1,
                        title: 'franchise 1',
                    },
                    2: {
                        id: 2,
                        title: 'franchise 2',
                    },
                },
                franchises: {
                    ids: ['1', '2'],
                    isFetching: false,
                },
            },
        };
        const expectedResult = [
            {
                id: 1,
                title: 'franchise 1',
            },
            {
                id: 2,
                title: 'franchise 2',
            },
        ];
        const result = selectFranchises(state, 'franchises');
        expect(result).toEqual(expectedResult);
    });
});
