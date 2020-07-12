import React from "react";
import Container, {GamesContainer, hasFiltersSearchTerm} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {Provider} from 'react-redux'
import {mockStore} from '../../../../tests/setup';

describe('<GamesContainer/> functions', () => {
    it('invokes hasFiltersSearchTerm as expected', () => {
        const hasTerm1 = hasFiltersSearchTerm({filter: 'test:123,name:'});
        const hasTerm2 = hasFiltersSearchTerm({filter: 'test:123,name:123'});
        const hasTerm3 = hasFiltersSearchTerm({});
        expect(hasTerm1).toEqual(false);
        expect(hasTerm2).toEqual(true);
        expect(hasTerm3).toEqual(false);
    });
})

describe('<GamesContainer/>', () => {
    const fetchGames = jest.fn(() => {});
    const clearGamesState = jest.fn(() => Promise.resolve());

    const defaultProps = {
        containerType: 'all',
        games: [],
        isFetching: false,
        error: false,
        meta: {
            offset: 0,
            limit: 10,
            total: -1,
            filters: {},
        },
        fetchGames,
        clearGamesState,
    };

    beforeEach(() => {
        fetchGames.mockClear();
        clearGamesState.mockClear();
    });

    it('tests Container Component with offset larger than total', () => {
        mountWithBaseWrapper(<GamesContainer {...{
            ...defaultProps,
            meta: {
                offset: 10,
                total: 5,
            }
        }} />);
        expect(fetchGames).toBeCalledTimes(0);
    });

    it('tests mounting with store', async () => {
        const store = mockStore({
            games: {
                byId: {},
                ids: [],
                meta: {
                    limit: 50,
                    offset: 0,
                    total: -1,
                    filters: {},
                },
                isFetching: false,
                error: false
            },
        });
        const wrapper = await mountWithBaseWrapper(<Provider store={store}><Container /></Provider>);
        wrapper.unmount();
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_GAMES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_GAMES_STARTED');
    });

    it('tests component updates as expected', () => {
        const wrapper = mountWithBaseWrapper(<GamesContainer {...defaultProps} />);
        wrapper.setProps({...defaultProps, containerType: 'test', meta: {filters: {filter: 'test'}}});
        wrapper.setProps({...defaultProps, containerType: 'test', meta: {filters: {filter: 'test'}}});
        wrapper.setProps({...defaultProps, isFetching: true, containerType: 'test', meta: {filters: {filter: 'test'}}});
        expect(clearGamesState).toBeCalledTimes(2);
    });

    it('tests mounting with search containerType', async () => {
        await mountWithBaseWrapper(<GamesContainer {...{
            ...defaultProps,
            containerType: 'search'
        }} />);
        expect(fetchGames).toBeCalledTimes(0);
    });

    it('tests loadMore when search is empty', async () => {
        const wrapper = await mountWithBaseWrapper(<GamesContainer {...{
            ...defaultProps,
            ...{
                meta: {
                    offset: 10,
                    limit: 10,
                    total: 100,
                    filters: {filter: 'test:123,name:123'},
                }
            },
            containerType: 'search'
        }} />);

        wrapper.setProps({ meta: {
            offset: 10,
            limit: 10,
            total: 100,
            filters: {filter: 'test:123,name:'},
        }});

        expect(fetchGames).toBeCalledTimes(0);
        expect(clearGamesState).toBeCalledTimes(2);
    });
});