import {companies} from '../index';
import * as types from '../../../types';
import {defaultLimit} from '../../../../config';

describe('Companies Reducers', () => {
    it('simulates no params on companies reducer', () => {
        const initialState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
                filters: {},
            },
        };
        expect(companies()).toEqual(initialState);
    });

    it('simulates FETCH_COMPANIES_STARTED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_STARTED,
            payload: {meta: {}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANIES_STARTED action with clearState', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_STARTED,
            payload: {clearState: true},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANIES_SUCCEEDED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const expectedNewState = {
            ids: [1, 2],
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
            isFetching: false,
            error: false,
            meta: {
                offset: defaultLimit,
                limit: defaultLimit,
                total: 20,
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_SUCCEEDED,
            payload: {
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
                meta: {
                    offset: 5,
                    total: 20,
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid FETCH_COMPANIES_SUCCEEDED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 5,
                limit: defaultLimit,
                total: 20,
            },
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 5 + defaultLimit,
                limit: defaultLimit,
                total: 20,
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANIES_SUCCEEDED,
            payload: {
                companies: [],
                meta: {
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
            ids: [],
            byId: {},
            isFetching: true,
            error: false,
        };
        const expectedNewState1 = {
            ids: [],
            byId: {},
            isFetching: false,
            error: true,
        };
        const newState1 = companies(oldState, {
            type: types.FETCH_COMPANIES_FAILED,
            payload: true,
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            ids: [],
            byId: {},
            isFetching: false,
            error: 'error occurred',
        };
        const newState2 = companies(oldState, {
            type: types.FETCH_COMPANIES_FAILED,
            payload: {error: 'error occurred'},
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates invalid SET_COMPANIES_SEARCH_FILTERS action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 5,
                limit: defaultLimit,
                total: 20,
                filters: {},
            },
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
                filters: {
                    filter: 'test_filter',
                },
            },
        };
        const newState = companies(oldState, {
            type: types.SET_COMPANIES_SEARCH_FILTERS,
            payload: {
                filter: 'test_filter',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_COMPANY_SUCCEEDED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const expectedNewState = {
            ids: [],
            byId: {
                1: {
                    guid: 1,
                    title: 'company 1',
                },
            },
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            },
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANY_SUCCEEDED,
            payload: {
                data: {
                    guid: 1,
                    title: 'company 1',
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
        };
        const newState = companies(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
