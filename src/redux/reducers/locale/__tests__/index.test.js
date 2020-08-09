import {locale} from '../index';
import * as types from '../../../types';

describe('Locale Reducers', () => {
    it('simulates no params on locale reducer', () => {
        const initialState = {
            currentLocale: 'en',
            locales: ['en', 'fr'],
        };
        expect(locale()).toEqual(initialState);
    });

    it('simulates SET_LOCALE action', () => {
        const oldState = {
            currentLocale: 'en',
            locales: ['en', 'fr'],
        };
        const expectedNewState = {
            currentLocale: 'fr',
            locales: ['en', 'fr'],
        };
        const newState = locale(oldState, {
            type: types.SET_LOCALE,
            payload: 'fr',
        });
        expect(newState).toEqual(expectedNewState);
    });

    it('simulates invalid action name', () => {
        const oldState = {
            currentLocale: 'en',
            locales: ['en', 'fr'],
        };
        const expectedNewState = {
            currentLocale: 'en',
            locales: ['en', 'fr'],
        };
        const newState = locale(oldState, {
            type: 'INVALID',
            payload: 'fr',
        });
        expect(newState).toEqual(expectedNewState);
    });
});
