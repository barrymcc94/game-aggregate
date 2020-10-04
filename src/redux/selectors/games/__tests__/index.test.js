import {selectGames} from '../index';

describe('Games Selector', () => {
    it('simulates selectGames 1', () => {
        const state = {
            games: {
                ids: [],
                byId: {},
                isFetching: false,
            },
        };
        const expectedResult = [];
        const result = selectGames(state);
        expect(result).toEqual(expectedResult);
    });

    it('simulates selectGames 2', () => {
        const state = {
            games: {
                byId: {
                    1: {
                        id: 1,
                        title: 'post 1',
                    },
                    2: {
                        id: 2,
                        title: 'post 2',
                    },
                },
                games: {
                    ids: ['1', '2'],
                    isFetching: false,
                },
            },
        };
        const expectedResult = [
            {
                id: 1,
                title: 'post 1',
            },
            {
                id: 2,
                title: 'post 2',
            },
        ];
        const result = selectGames(state, 'games');
        expect(result).toEqual(expectedResult);
    });
});
