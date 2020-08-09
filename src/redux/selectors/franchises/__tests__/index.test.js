import {selectFranchises} from '../index';

describe('Franchises Selector', () => {
    it('simulates selectFranchises 1', () => {
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

    it('simulates selectFranchises 2', () => {
        const state = {
            franchises: {
                ids: ['1', '2'],
                byId: {
                    '1': {
                        id: 1,
                        title: 'post 1',
                    },
                    '2': {
                        id: 2,
                        title: 'post 2',
                    },
                },
                isFetching: false,
            },
        };
        const expectedResult = [
            {
                id: 1,
                title: 'post 1',
            },
            {
                id: 2,
                title: 'post 2',
            },
        ];
        const result = selectFranchises(state);
        expect(result).toEqual(expectedResult);
    });
});
