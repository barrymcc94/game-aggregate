import {SET_LOCALE} from '../../../types';
import {setLocale, changeLocale} from '../index';

describe('Locale Actions', () => {
    it('setLocale', () => {
        const action = setLocale('en');
        expect(action).toEqual({
            type: SET_LOCALE,
            payload: 'en'
        });
    });

    it('tests changeLocale', async () => {
        const action = await global.testStore.dispatch(changeLocale('en'));
        expect(action).toEqual({
            type: SET_LOCALE,
            payload: 'en'
        });
    })
});