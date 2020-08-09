import {selectFranchise} from '../index';

describe('Franchise Selector', () => {
    it('simulates selectFranchise ', () => {
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
