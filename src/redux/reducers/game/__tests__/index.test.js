import {game} from '../index';
import * as types from '../../../types';

describe('Game Reducers', () => {

    it('simulates no params on games reducer', () => {
        const initialState = {
            data: {},
            meta: {
                isFetching: false,
                error: false
            }
        };
        expect(game()).toEqual(initialState);
    });

    it('simulates FETCH_GAME_STARTED action', () => {
        const oldState = {
            meta: {
                isFetching: false,
                error: false,
            }
        };
        const expectedNewState = {
            meta: {
                isFetching: true,
                error: false,
            }
        };
        const newState = game(oldState, {
            type: types.FETCH_GAME_STARTED
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAME_SUCCEEDED action', () => {
        const oldState = {
            meta: {
                isFetching: true,
                error: false,
            }
        };
        const expectedNewState = {
            meta: {
                isFetching: false,
                error: false,
            }
        };
        const newState = game(oldState, {
            type: types.FETCH_GAME_SUCCEEDED,
            payload: {
                data: {
                    id: 1
                }
            }
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GAME_FAILED action', () => {
        const oldState = {
            meta: {
                isFetching: false,
                error: false,
            }
        };
        const expectedNewState1 = {
            meta: {
                isFetching: false,
                error: true,
            }
        };
        const newState1 = game(oldState, {
            type: types.FETCH_GAME_FAILED,
            payload: true
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            meta: {
                isFetching: false,
                error: 'error occurred',
            }
        };
        const newState2 = game(oldState, {
            type: types.FETCH_GAME_FAILED,
            payload: {error: 'error occurred'}
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates invalid action', () => {
        const oldState = {
            meta: {
                isFetching: false,
                error: false,
            }
        };
        const expectedNewState = {
            meta: {
                isFetching: false,
                error: false,
            }
        };
        const newState = game(oldState, {
            type: 'INVALID'
        });
        expect(newState).toEqual(expectedNewState);
    });
});