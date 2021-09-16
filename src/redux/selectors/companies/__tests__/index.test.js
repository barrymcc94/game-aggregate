import {selectCompany, selectCompanies} from '../index';

describe('Company Selector', () => {
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

describe('Companies Selector', () => {
    it('simulates selectCompanies 1', () => {
        const state = {
            companies: {
                ids: [],
                byId: {},
                isFetching: false,
            },
        };
        const expectedResult = [];
        const result = selectCompanies(state);
        expect(result).toEqual(expectedResult);
    });

    it('simulates selectCompanies 2', () => {
        const state = {
            companies: {
                byId: {
                    1: {
                        id: 1,
                        title: 'post 1',
                    },
                    2: {
                        id: 2,
                        title: 'post 2',
                    },
                },
                companies: {
                    ids: ['1', '2'],
                    isFetching: false,
                },
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
        const result = selectCompanies(state, 'companies');
        expect(result).toEqual(expectedResult);
    });
});
