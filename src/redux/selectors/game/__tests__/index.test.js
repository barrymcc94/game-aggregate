import {selectGame} from '../index';

describe('Game Selector', () => {
    it('simulates selectGame ', () => {
        const state = {
            games: {
                byId: {
                    id1: {id: 1},
                },
            },
        };
        const expectedResult = {id: 1};
        const result = selectGame(state, 'id1');
        expect(result).toEqual(expectedResult);
    });
});
