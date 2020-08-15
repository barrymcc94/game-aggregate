import {selectCompany} from '../index';

describe('Company Selectors', () => {
    it('simulates selectCompany ', () => {
        const state = {
            companies: {
                byId: {
                    id1: {id: 1},
                },
            },
        };
        const expectedResult = {id: 1};
        const result = selectCompany(state, 'id1');
        expect(result).toEqual(expectedResult);
    });
});
