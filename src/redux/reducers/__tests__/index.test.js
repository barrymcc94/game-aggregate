import * as types from '../../types';
import {defaultLimit} from '../../../config';
import {games} from '../games';
import {companies} from '../companies';
import {franchises} from '../franchises';

describe('generic reducers - handling list actions', () => {
    const reducerList = [
        {
            reducer: games,
            loadType: types.FETCH_GAMES_STARTED,
            successType: types.FETCH_GAMES_SUCCEEDED,
            errorType: types.FETCH_GAMES_FAILED,
        },
        {
            reducer: companies,
            loadType: types.FETCH_COMPANIES_STARTED,
            successType: types.FETCH_COMPANIES_SUCCEEDED,
            errorType: types.FETCH_COMPANIES_FAILED,
        },
        {
            reducer: franchises,
            loadType: types.FETCH_FRANCHISES_STARTED,
            successType: types.FETCH_FRANCHISES_SUCCEEDED,
            errorType: types.FETCH_FRANCHISES_FAILED,
        },
    ];
    it.each(reducerList)(
        'validates no params returns just the initial state',
        ({reducer}) => {
            expect(reducer()).toStrictEqual({byId: {}});
        }
    );

    it.each(reducerList)(
        'verifies $loadType updates state as expected',
        ({reducer, loadType}) => {
            const oldState = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: false,
                    error: false,
                },
            };
            const expectedNewState = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: true,
                    error: false,
                    query: {
                        filter: {name: ''},
                        offset: 0,
                        limit: defaultLimit,
                        total: -1,
                    },
                },
            };
            const newState = reducer(oldState, {
                type: loadType,
                payload: {id: 'listData', query: {filter: {name: ''}}},
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies $loadType updates state with loading state as expected',
        ({reducer, loadType}) => {
            const oldState = {
                byId: {},
                listData: {},
            };
            const expectedNewState = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: true,
                    error: false,
                    query: {
                        filter: {name: ''},
                        offset: 0,
                        limit: defaultLimit,
                        total: -1,
                    },
                },
            };
            const newState = reducer(oldState, {
                type: loadType,
                payload: {id: 'listData', query: {filter: {name: ''}}},
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies $successType updates state with no existing data as expected',
        ({reducer, successType}) => {
            const oldState = {
                byId: {},
                listData: {
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
                        title: 'item 1',
                    },
                    2: {
                        guid: 2,
                        title: 'item 2',
                    },
                },
                listData: {
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
            const newState = reducer(oldState, {
                type: successType,
                payload: {
                    id: 'listData',
                    data: [
                        {
                            guid: 1,
                            title: 'item 1',
                        },
                        {
                            guid: 2,
                            title: 'item 2',
                        },
                    ],
                    query: {
                        offset: 5,
                        total: 20,
                    },
                },
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies $successType action with no new data updates state as expected',
        ({reducer, successType}) => {
            const oldState = {
                byId: {},
                listData: {
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
                listData: {
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
            const newState = reducer(oldState, {
                type: successType,
                payload: {
                    id: 'listData',
                    listData: [],
                    query: {
                        offset: 5,
                        limit: defaultLimit,
                        total: 20,
                    },
                },
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies $errorType action updates state as expected',
        ({reducer, errorType}) => {
            const oldState = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: true,
                    error: false,
                },
            };
            const expectedNewState1 = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: false,
                    error: true,
                },
            };
            const newState1 = reducer(oldState, {
                type: errorType,
                payload: {id: 'listData'},
            });
            expect(newState1).toEqual(expectedNewState1);

            const expectedNewState2 = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: false,
                    error: 'error occurred',
                },
            };
            const newState2 = reducer(oldState, {
                type: errorType,
                payload: {id: 'listData', error: 'error occurred'},
            });
            expect(newState2).toEqual(expectedNewState2);
        }
    );
});

describe('generic reducers - handling singular actions', () => {
    const reducerList = [
        {
            reducer: games,
            loadType: types.FETCH_GAME_STARTED,
            successType: types.FETCH_GAME_SUCCEEDED,
            errorType: types.FETCH_GAME_FAILED,
        },
        {
            reducer: companies,
            loadType: types.FETCH_COMPANY_STARTED,
            successType: types.FETCH_COMPANY_SUCCEEDED,
            errorType: types.FETCH_COMPANY_FAILED,
        },
        {
            reducer: franchises,
            loadType: types.FETCH_FRANCHISE_STARTED,
            successType: types.FETCH_FRANCHISE_SUCCEEDED,
            errorType: types.FETCH_FRANCHISE_FAILED,
        },
    ];

    it.each(reducerList)(
        'verifies $loadType applies single item loading state to state as expected',
        ({reducer, loadType}) => {
            const oldState = {
                byId: {},
                listData: {
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
                listData: {
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
            const newState = reducer(oldState, {
                type: loadType,
                payload: {
                    guid: '1',
                },
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies $successType applies single item to state as expected',
        ({reducer, successType}) => {
            const oldState = {
                byId: {},
                listData: {
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
                        title: 'item 1',
                        isFetching: false,
                        error: false,
                    },
                },
                listData: {
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
            const newState = reducer(oldState, {
                type: successType,
                payload: {
                    id: 'listData',
                    data: {
                        guid: 1,
                        title: 'item 1',
                    },
                },
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies $errorType applies error item state to state as expected',
        ({reducer, errorType}) => {
            const oldState = {
                byId: {},
                listData: {
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
                listData: {
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
            const newState = reducer(oldState, {
                type: errorType,
                payload: {
                    guid: '1',
                },
            });
            expect(newState).toEqual(expectedNewState);
        }
    );

    it.each(reducerList)(
        'verifies invalid action is ignored and unmodified state is returned',
        ({reducer}) => {
            const oldState = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: false,
                    error: false,
                },
            };
            const expectedNewState = {
                byId: {},
                listData: {
                    ids: [],
                    isFetching: false,
                    error: false,
                },
            };
            const newState = reducer(oldState, {
                type: 'INVALID',
            });
            expect(newState).toEqual(expectedNewState);
        }
    );
});
