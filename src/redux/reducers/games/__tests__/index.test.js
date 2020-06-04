import {games} from '../index';
import * as types from '../../../types';
import {defaultLimit} from '../../../../config';

describe('Games Reducers', () => {

    it('simulates no params on games reducer', () => {
        const initialState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
                filters: {}
            }
        };
        expect(games()).toEqual(initialState);
    });

    it('simulates FETCH_GAMES_STARTED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: false,
        };
        const newState = games(oldState, {
            type: types.FETCH_GAMES_STARTED
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAMES_SUCCEEDED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            }
        };
        const expectedNewState = {
            ids: [1, 2],
            byId: {
                "1": {
                    guid: 1,
                    title: "game 1",
                },
                "2": {
                    guid: 2,
                    title: "game 2",
                },
            },
            isFetching: false,
            error: false,
            meta: {
                offset: defaultLimit,
                limit: defaultLimit,
                total: 20,
            }
        };
        const newState = games(oldState, {
            type: types.FETCH_GAMES_SUCCEEDED,
            payload: {
                games: [{
                    guid: 1,
                    title: "game 1",
                }, {
                    guid: 2,
                    title: "game 2",
                }],
                meta: {
                    offset: 5,
                    total: 20,
                }
            }
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid FETCH_GAMES_SUCCEEDED action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 5,
                limit: defaultLimit,
                total: 20,
            }
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
            }
        };
        const newState = games(oldState, {
            type: types.FETCH_GAMES_SUCCEEDED,
            payload: {games: [], meta: {
                offset: 5,
                limit: defaultLimit,
                total: 20,
            }},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAMES_FAILED action', () => {
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
        const newState1 = games(oldState, {
            type: types.FETCH_GAMES_FAILED,
            payload: true
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            ids: [],
            byId: {},
            isFetching: false,
            error: 'error occurred',
        };
        const newState2 = games(oldState, {
            type: types.FETCH_GAMES_FAILED,
            payload: {error: 'error occurred'}
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates invalid SET_GAMES_SEARCH_FILTERS action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 5,
                limit: defaultLimit,
                total: 20,
                filters: {}
            }
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
                    filter: 'test_filter'
                }
            }
        };
        const newState = games(oldState, {
            type: types.SET_GAMES_SEARCH_FILTERS,
            payload: {
                filter: 'test_filter'
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid CLEAR_GAMES_STATE action', () => {
        const oldState = {
            ids: [],
            byId: {},
            isFetching: true,
            error: true,
            meta: {
                offset: 5,
                limit: defaultLimit,
                total: 20,
            }
        };
        const expectedNewState = {
            ids: [],
            byId: {},
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
                filters: {},
            }
        };
        const newState = games(oldState, {
            type: types.CLEAR_GAMES_STATE,
            payload: {},
            filters: {},
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
        const newState = games(oldState, {
            type: 'INVALID'
        });
        expect(newState).toEqual(expectedNewState);
    });
});