import {selectCompanies} from '../index';

describe('Companies Selector', () => {
    it('simulates selectCompanies 1', () => {
        const state = {
            companies: {
                ids: [],
                byId: {},
                isFetching: false,
            }
        };
        const expectedResult = [];
        const result = selectCompanies(state);
        expect(result).toEqual(expectedResult);
    });

    it('simulates selectCompanies 2', () => {
        const state = {
            companies: {
                ids: ["1", "2"],
                byId: {
                    "1": {
                        id: 1,
                        title: "post 1",
                    },
                    "2": {
                        id: 2,
                        title: "post 2",
                    },
                },
                isFetching: false,
            }
        };
        const expectedResult = [{
            id: 1,
            title: "post 1",
        }, {
            id: 2,
            title: "post 2",
        }];
        const result = selectCompanies(state);
        expect(result).toEqual(expectedResult);
    });
});