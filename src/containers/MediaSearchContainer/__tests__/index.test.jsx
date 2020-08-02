import React from "react";
import MediaSearchContainer from '../index';
import debounce from 'lodash.debounce';
import {Provider} from 'react-redux'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';
jest.mock('lodash.debounce');
jest.useFakeTimers();

describe('<MediaSearchContainer/>', () => {
    const setSearchFilters = jest.fn();
    debounce.mockImplementation(fn => fn);

    const defaultProps = {
        mediaType: 'games',
        id: 'test_id',
        label: 'search',
        setSearchFilters
    };

    const defaultStoreProps = {
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
    };

    beforeEach(() => {
        setSearchFilters.mockClear();
    });

    it('tests MediaSearchContainer with games props', () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = mountWithBaseWrapper(<MediaSearchContainer {...defaultProps} />, store);
        wrapper.find('input').simulate('change', {target: {value: 'test input'}});
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('SET_GAMES_SEARCH_FILTERS');
    });

    it('tests MediaSearchContainer with companies props', () => {
        const store = mockStore({companies: defaultStoreProps});
        const wrapper = mountWithBaseWrapper(<MediaSearchContainer {...{...defaultProps, mediaType: 'companies'}} />, store);
        wrapper.find('input').simulate('change', {target: {value: 'test input'}});
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('SET_COMPANIES_SEARCH_FILTERS');
    });

    it('tests MediaSearchContainer with invalid searchType prop', () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = mountWithBaseWrapper(<MediaSearchContainer {...{...defaultProps, mediaType: 'what?'}}/>, store);
        wrapper.find('input').simulate('change', {target: {value: 'test input'}});
        expect(store.getActions().length).toEqual(0);
    });

});