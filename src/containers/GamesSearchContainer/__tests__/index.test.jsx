import React from "react";
import Container, {GamesSearchContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {Provider} from 'react-redux'
import {mockStore} from '../../../../tests/setup';
import debounce from 'lodash.debounce';
jest.mock('lodash.debounce');
jest.useFakeTimers();

describe('<GamesSearchContainer/>', () => {
    const setGamesSearchFilters = jest.fn();
    const clearGamesState = jest.fn();

    const defaultProps = {
        searchLabel: 'test',
        setGamesSearchFilters,
        clearGamesState
    };

    beforeEach(() => {
        setGamesSearchFilters.mockClear();
        clearGamesState.mockClear();
    });

    it('tests Container Component with offset larger than total', () => {
        mountWithBaseWrapper(<GamesSearchContainer {...defaultProps} />);
        expect(setGamesSearchFilters).toBeCalledTimes(0);
        expect(clearGamesState).toBeCalledTimes(0);
    });

    it('tests mounting with store', async () => {
        debounce.mockImplementation(fn => fn);

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
        const wrapper = mountWithBaseWrapper(<Provider store={store}><Container searchLabel="test" /></Provider>);
        expect(store.getActions().length).toEqual(0);

        await wrapper.find('input').simulate('change', {target: {value: 'test input'} });
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('SET_GAMES_SEARCH_FILTERS');
        expect(store.getActions()[0].payload.filter).toMatch(/(name:test%20input)/);
    });
});