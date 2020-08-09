import {
    selectCompany,
    getFormattedGames,
    selectCompanyGamesData,
} from '../index';

describe('Company Selectors', () => {
    it('simulates selectCompany ', () => {
        const state = {
            companies: {
                byId: {
                    id1: {id: 1},
                },
            },
        };
        const expectedResult = {id: 1};
        const result = selectCompany(state, 'id1');
        expect(result).toEqual(expectedResult);
    });

    it('simulates getFormattedGames', () => {
        const gamesState = {
            byId: {
                game1: {
                    guid: 'game1',
                    id: 123,
                },
                game2: {
                    guid: 'game2',
                    id: 321,
                },
            },
            meta: {
                limit: 10,
            },
        };
        const result = getFormattedGames(
            [
                {
                    api_detail_url: '/api/game/game1/',
                },
                {
                    api_detail_url: '/api/game/game2/',
                },
            ],
            gamesState
        );

        expect(result).toEqual([
            {
                guid: 'game1',
                id: 123,
            },
            {
                guid: 'game2',
                id: 321,
            },
        ]);
    });

    it('simulates getFormattedGames with err', () => {
        const result = getFormattedGames(null, null);
        expect(result).toEqual([]);
    });

    it('simulates selectCompanyGamesData ', () => {
        const state = {
            games: {
                isFetching: false,
                error: false,
                byId: {
                    game1: {
                        guid: 'game1',
                    },
                    game2: {
                        guid: 'game2',
                    },
                },
                meta: {
                    limit: 100,
                },
            },
            companies: {
                byId: {
                    company1: {
                        guid: 'company1',
                        id: 1,
                        published_games: [{api_detail_url: '/api/game/game1/'}],
                        developed_games: [{api_detail_url: '/api/game/game2/'}],
                    },
                },
            },
        };
        const result = selectCompanyGamesData(state, 'company1');
        expect(result).toEqual({
            error: false,
            isFetching: false,
            publishedGames: [{guid: 'game1'}],
            developedGames: [{guid: 'game2'}],
        });
    });

    it('simulates selectCompanyGamesData with no company data', () => {
        const state = {
            games: {
                isFetching: false,
                error: false,
                meta: {
                    limit: 100,
                },
            },
            companies: {
                byId: {},
            },
        };
        const result = selectCompanyGamesData(state, '');
        expect(result).toEqual({
            error: false,
            isFetching: false,
            developedGames: [],
            publishedGames: [],
        });
    });
});
