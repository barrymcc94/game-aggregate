import {auth} from '../index';
import * as types from '../../../types';

describe('Auth Reducers', () => {
    it('simulates no params on auth reducer', () => {
        const initialState = {
            giantbomb: {
                api_key: null,
                isFetching: false,
                error: false,
            },
        };
        expect(auth()).toEqual(initialState);
    });

    it('simulates FETCH_GB_API_KEY_STARTED action', () => {
        const oldState = {
            giantbomb: {
                api_key: null,
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            giantbomb: {
                api_key: null,
                isFetching: true,
                error: false,
            },
        };
        const newState = auth(oldState, {
            type: types.FETCH_GB_API_KEY_STARTED,
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GB_API_KEY_SUCCEEDED action', () => {
        const oldState = {
            giantbomb: {
                api_key: null,
                isFetching: true,
                error: false,
            },
        };
        const expectedNewState = {
            giantbomb: {
                api_key: 'key',
                isFetching: false,
                error: false,
            },
        };
        const newState = auth(oldState, {
            type: types.FETCH_GB_API_KEY_SUCCEEDED,
            payload: {
                api_key: 'key',
            },
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates FETCH_GB_API_KEY_FAILED action', () => {
        const oldState = {
            giantbomb: {
                api_key: null,
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            giantbomb: {
                api_key: null,
                isFetching: false,
                error: true,
            },
        };
        const newState = auth(oldState, {
            type: types.FETCH_GB_API_KEY_FAILED,
            payload: true,
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid action', () => {
        const oldState = {
            giantbomb: {
                api_key: null,
                isFetching: false,
                error: false,
            },
        };
        const expectedNewState = {
            giantbomb: {
                api_key: null,
                isFetching: false,
                error: false,
            },
        };
        const newState = auth(oldState, {
            type: 'INVALID',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
