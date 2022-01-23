import {companies} from '../index';
import * as types from '../../../types';
import {defaultLimit} from '../../../../config';

describe('Companys Reducers', () => {
    it('simulates no params on companies reducer', () => {
        const initialState = {
            byId: {},
        };
        expect(companies()).toEqual(initialState);
    });

    it('simulates FETCH_COMPANIES_STARTED action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: true,
                error: false,
                query: {
                    filter: {name: 'test'},
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_STARTED,
            payload: {id: 'companies', query: {filter: {name: 'test'}}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANIES_STARTED action with no existing companies state', () => {
        const oldState = {
            byId: {},
            companies: {},
        };
        const expectedNewState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: true,
                error: false,
                query: {
                    filter: {name: 'test'},
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_STARTED,
            payload: {id: 'companies', query: {filter: {name: 'test'}}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANIES_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            companies: {
                isFetching: true,
                error: true,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const expectedNewState = {
            byId: {
                1: {
                    guid: 1,
                    title: 'company 1',
                },
                2: {
                    guid: 2,
                    title: 'company 2',
                },
            },
            companies: {
                ids: [1, 2],
                isFetching: false,
                error: false,
                query: {
                    offset: defaultLimit,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_SUCCEEDED,
            payload: {
                id: 'companies',
                data: [
                    {
                        guid: 1,
                        title: 'company 1',
                    },
                    {
                        guid: 2,
                        title: 'company 2',
                    },
                ],
                query: {
                    offset: 5,
                    total: 20,
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid FETCH_COMPANIES_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: true,
                error: true,
                query: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        };
        const expectedNewState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 5 + defaultLimit,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_SUCCEEDED,
            payload: {
                id: 'companies',
                companies: [],
                query: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANIES_FAILED action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: true,
                error: false,
            },
        };
        const expectedNewState1 = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: true,
            },
        };
        const newState1 = companies(oldState, {
            type: types.FETCH_COMPANIES_FAILED,
            payload: {id: 'companies'},
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: 'error occurred',
            },
        };
        const newState2 = companies(oldState, {
            type: types.FETCH_COMPANIES_FAILED,
            payload: {id: 'companies', error: 'error occurred'},
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates FETCH_COMPANY_STARTED action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const expectedNewState = {
            byId: {
                1: {
                    isFetching: true,
                    error: false,
                },
            },
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANY_STARTED,
            payload: {
                guid: '1',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANY_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const expectedNewState = {
            byId: {
                1: {
                    guid: 1,
                    title: 'company 1',
                    isFetching: false,
                    error: false,
                },
            },
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANY_SUCCEEDED,
            payload: {
                id: 'companies',
                data: {
                    guid: 1,
                    title: 'company 1',
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANY_FAILED action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const expectedNewState = {
            byId: {
                1: {
                    isFetching: false,
                    error: true,
                },
            },
            companies: {
                ids: [],
                isFetching: false,
                error: false,
                query: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANY_FAILED,
            payload: {
                guid: '1',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid action', () => {
        const oldState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            byId: {},
            companies: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const newState = companies(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
