import {games} from '../index';
import * as types from '../../../types';
import {defaultLimit} from '../../../../config';

describe('Games Reducers', () => {
    it('simulates no params on games reducer', () => {
        const initialState = {
            byId: {},
        };
        expect(games()).toEqual(initialState);
    });

    it('simulates FETCH_GAMES_STARTED action', () => {
        const oldState = {
            byId: {},
            games: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            byId: {},
            games: {
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
        const newState = games(oldState, {
            type: types.FETCH_GAMES_STARTED,
            payload: {id: 'games', queryObj: {filter: ''}, meta: {}},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAMES_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            games: {
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
                    title: 'game 1',
                },
                2: {
                    guid: 2,
                    title: 'game 2',
                },
            },
            games: {
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
        const newState = games(oldState, {
            type: types.FETCH_GAMES_SUCCEEDED,
            payload: {
                id: 'games',
                data: [
                    {
                        guid: 1,
                        title: 'game 1',
                    },
                    {
                        guid: 2,
                        title: 'game 2',
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

    it('simulates invalid FETCH_GAMES_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            games: {
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
            games: {
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
        const newState = games(oldState, {
            type: types.FETCH_GAMES_SUCCEEDED,
            payload: {
                id: 'games',
                games: [],
                meta: {
                    offset: 5,
                    limit: defaultLimit,
                    total: 20,
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAMES_FAILED action', () => {
        const oldState = {
            byId: {},
            games: {
                ids: [],
                isFetching: true,
                error: false,
            },
        };
        const expectedNewState1 = {
            byId: {},
            games: {
                ids: [],
                isFetching: false,
                error: true,
            },
        };
        const newState1 = games(oldState, {
            type: types.FETCH_GAMES_FAILED,
            payload: {id: 'games'},
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            byId: {},
            games: {
                ids: [],
                isFetching: false,
                error: 'error occurred',
            },
        };
        const newState2 = games(oldState, {
            type: types.FETCH_GAMES_FAILED,
            payload: {id: 'games', error: 'error occurred'},
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates SET_GAMES_SEARCH_FILTERS action', () => {
        const oldState = {
            byId: {},
            games: {
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
            games: {
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
        const newState = games(oldState, {
            type: types.SET_GAMES_SEARCH_FILTERS,
            payload: {
                id: 'games',
                filter: 'test_filter',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid CLEAR_GAMES_STATE action', () => {
        const oldState = {
            byId: {},
            games: {
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
            games: {
                ids: [],
                isFetching: false,
                error: false,
                meta: {
                    offset: 0,
                    limit: defaultLimit,
                    total: -1,
                    filters: {},
                },
            },
        };
        const newState = games(oldState, {
            type: types.CLEAR_GAMES_STATE,
            payload: {id: 'games'},
            filters: {},
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAME_SUCCEEDED action', () => {
        const oldState = {
            byId: {},
            games: {
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
                    title: 'game 1',
                },
            },
            games: {
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
        const newState = games(oldState, {
            type: types.FETCH_GAME_SUCCEEDED,
            payload: {
                id: 'games',
                data: {
                    guid: 1,
                    title: 'game 1',
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid action', () => {
        const oldState = {
            byId: {},
            games: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            byId: {},
            games: {
                ids: [],
                isFetching: false,
                error: false,
            },
        };
        const newState = games(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
