import {franchises} from '../index';
import * as types from '../../../types';
import {defaultLimit} from '../../../../config';

describe('Franchises Reducers', () => {
    it('simulates no params on franchises reducer', () => {
        const initialState = {
            byId: {},
        };
        expect(franchises()).toEqual(initialState);
    });

    it('simulates FETCH_FRANCHISES_STARTED action', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: true,
                error: false,
                meta: {
                    filters: {
                        filter: '',
                    },
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_STARTED,
            payload: {id: 'franchises', queryObj: {filter: ''}, meta: {}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISES_STARTED action with no existing franchises state', () => {
        const oldState = {
            byId: {},
            franchises: {},
        };
        const expectedNewState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: true,
                error: false,
                meta: {
                    filters: {
                        filter: '',
                    },
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_STARTED,
            payload: {id: 'franchises', queryObj: {filter: ''}, meta: {}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISES_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            franchises: {
                isFetching: true,
                error: true,
                meta: {
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
                    title: 'franchise 1',
                },
                2: {
                    guid: 2,
                    title: 'franchise 2',
                },
            },
            franchises: {
                ids: [1, 2],
                isFetching: false,
                error: false,
                meta: {
                    offset: defaultLimit,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_SUCCEEDED,
            payload: {
                id: 'franchises',
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
            byId: {},
            franchises: {
                ids: [],
                isFetching: true,
                error: true,
                meta: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        };
        const expectedNewState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
                    offset: 5 + defaultLimit,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISES_SUCCEEDED,
            payload: {
                id: 'franchises',
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
            byId: {},
            franchises: {
                ids: [],
                isFetching: true,
                error: false,
            },
        };
        const expectedNewState1 = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: true,
            },
        };
        const newState1 = franchises(oldState, {
            type: types.FETCH_FRANCHISES_FAILED,
            payload: {id: 'franchises'},
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: 'error occurred',
            },
        };
        const newState2 = franchises(oldState, {
            type: types.FETCH_FRANCHISES_FAILED,
            payload: {id: 'franchises', error: 'error occurred'},
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates SET_FRANCHISES_SEARCH_FILTERS action', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: true,
                error: true,
                meta: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                    filters: {},
                },
            },
        };
        const expectedNewState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                    filters: {
                        filter: 'test_filter',
                    },
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.SET_FRANCHISES_SEARCH_FILTERS,
            payload: {
                id: 'franchises',
                filter: 'test_filter',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates SET_FRANCHISES_SEARCH_FILTERS action with the same filter', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: true,
                error: true,
                meta: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                    filters: {
                        filter: 'test',
                    },
                },
            },
        };
        const expectedNewState = {...oldState};
        const newState = franchises(oldState, {
            type: types.SET_FRANCHISES_SEARCH_FILTERS,
            payload: {
                id: 'franchises',
                filter: 'test',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISE_STARTED action', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
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
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISE_STARTED,
            payload: {
                guid: '1',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISE_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
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
                    title: 'franchise 1',
                    isFetching: false,
                    error: false,
                },
            },
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISE_SUCCEEDED,
            payload: {
                id: 'franchises',
                data: {
                    guid: 1,
                    title: 'franchise 1',
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISE_FAILED action', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
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
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                },
            },
        };
        const newState = franchises(oldState, {
            type: types.FETCH_FRANCHISE_FAILED,
            payload: {
                guid: '1',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid action', () => {
        const oldState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            byId: {},
            franchises: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const newState = franchises(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
