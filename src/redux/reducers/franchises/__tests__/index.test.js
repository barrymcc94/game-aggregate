import {franchises} from '../index';
import * as types from '../../../types';
import {defaultLimit} from '../../../../config';

describe('Companies Reducers', () => {
    it('simulates no params on franchises reducer', () => {
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
        expect(franchises()).toEqual(initialState);
    });

    it('simulates FETCH_FRANCHISES_STARTED action', () => {
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
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_STARTED,
            payload: {meta: {}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISES_STARTED action with clear prop', () => {
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
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_STARTED,
            payload: {clearState: true},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISES_SUCCEEDED action', () => {
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
                    title: 'franchise 1',
                },
                2: {
                    guid: 2,
                    title: 'franchise 2',
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
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_SUCCEEDED,
            payload: {
                data: [
                    {
                        guid: 1,
                        title: 'franchise 1',
                    },
                    {
                        guid: 2,
                        title: 'franchise 2',
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

    it('simulates invalid FETCH_FRANCHISES_SUCCEEDED action', () => {
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
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_SUCCEEDED,
            payload: {
                franchises: [],
                meta: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISES_FAILED action', () => {
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
        const newState1 = franchises(oldState, {
            type: types.FETCH_FRANCHISES_FAILED,
            payload: true,
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            ids: [],
            byId: {},
            isFetching: false,
            error: 'error occurred',
        };
        const newState2 = franchises(oldState, {
            type: types.FETCH_FRANCHISES_FAILED,
            payload: {error: 'error occurred'},
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates invalid SET_FRANCHISES_SEARCH_FILTERS action', () => {
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
        const newState = franchises(oldState, {
            type: types.SET_FRANCHISES_SEARCH_FILTERS,
            payload: {
                filter: 'test_filter',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISE_SUCCEEDED action', () => {
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
                    title: 'franchise 1',
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
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISE_SUCCEEDED,
            payload: {
                data: {
                    guid: 1,
                    title: 'franchise 1',
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
        const newState = franchises(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
