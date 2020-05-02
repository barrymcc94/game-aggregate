import {setLocaleSaga, watchSetLocale} from '../index';

describe('Locale Sagas', () => {
    beforeEach(() => {
        document.documentElement.lang = 'en';
    });

    afterAll(() => {
        document.documentElement.lang = '';
    });

    it('tests setLocaleSaga with expected param', async () => {
        const gen = setLocaleSaga({payload: 'fr'});
        gen.next();
        expect(document.documentElement.lang).toBe('fr');
        expect(gen.next().done).toBe(true);
    });

    it('tests setLocaleSaga with no param', async () => {
        const gen = setLocaleSaga({});
        gen.next();
        expect(document.documentElement.lang).toBe('en');
        expect(gen.next().done).toBe(true);
    });

    it('tests watchSetLocale', async () => {
        const gen = watchSetLocale();
        expect(gen.next().value.type).toBe('FORK');
        expect(gen.next().done).toBe(true);
    });
});