import {isEqual} from '../index';

describe('GameList functions', () => {
    it('tests isEqual function', () => {
        expect(isEqual({fetchingGames: true}, {fetchingGames: true})).toEqual(
            true
        );
        expect(isEqual({fetchingGames: true}, {fetchingGames: false})).toEqual(
            false
        );
    });
});
