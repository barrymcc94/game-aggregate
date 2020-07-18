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
                filters: {}
            }
        };
        expect(companies()).toEqual(initialState);
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
            }
        };
        const expectedNewState = {
            ids: [],
            byId: {
                "1": {
                    guid: 1,
                    title: "company 1",
                }
            },
            isFetching: false,
            error: false,
            meta: {
                offset: 0,
                limit: defaultLimit,
                total: -1,
            }
        };
        const newState = companies(oldState, {
            type: types.FETCH_COMPANY_SUCCEEDED,
            payload: {
                data: {
                    guid: 1,
                    title: "company 1",
                }
            }
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
            type: 'INVALID'
        });
        expect(newState).toEqual(expectedNewState);
    });
});