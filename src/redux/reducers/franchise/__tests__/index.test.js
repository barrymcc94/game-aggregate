import {franchise} from '../index';
import * as types from '../../../types';

describe('Franchise Reducers', () => {
    it('simulates no params on franchise reducer', () => {
        const initialState = {
            isFetching: false,
            error: false,
        };
        expect(franchise()).toEqual(initialState);
    });

    it('simulates FETCH_FRANCHISE_STARTED action', () => {
        const oldState = {
            isFetching: false,
            error: false,
        };
        const expectedNewState = {
            isFetching: true,
            error: false,
        };
        const newState = franchise(oldState, {
            type: types.FETCH_FRANCHISE_STARTED,
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISE_SUCCEEDED action', () => {
        const oldState = {
            isFetching: true,
            error: false,
        };
        const expectedNewState = {
            isFetching: false,
            error: false,
        };
        const newState = franchise(oldState, {
            type: types.FETCH_FRANCHISE_SUCCEEDED,
            payload: {
                data: {
                    id: 1,
                },
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_FRANCHISE_FAILED action', () => {
        const oldState = {
            isFetching: false,
            error: false,
        };
        const expectedNewState1 = {
            isFetching: false,
            error: true,
        };
        const newState1 = franchise(oldState, {
            type: types.FETCH_FRANCHISE_FAILED,
            payload: true,
        });
        expect(newState1).toEqual(expectedNewState1);
        const expectedNewState2 = {
            isFetching: false,
            error: 'error occurred',
        };
        const newState2 = franchise(oldState, {
            type: types.FETCH_FRANCHISE_FAILED,
            payload: {error: 'error occurred'},
        });
        expect(newState2).toEqual(expectedNewState2);
    });

    it('simulates invalid action', () => {
        const oldState = {
            isFetching: false,
            error: false,
        };
        const expectedNewState = {
            isFetching: false,
            error: false,
        };
        const newState = franchise(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
