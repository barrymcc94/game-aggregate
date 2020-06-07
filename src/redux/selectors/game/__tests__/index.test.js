import {selectGame} from '../index';

describe('Game Selector', () => {
    it('simulates selectGame ', () => {
        const state = {
            game: {
                data: {id: 1},
            }
        };
        const expectedResult = {id: 1};
        const result = selectGame(state);
        expect(result).toEqual(expectedResult);
    });
});