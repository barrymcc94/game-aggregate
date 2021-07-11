import React from 'react';
import {act, fireEvent} from '@testing-library/react';
import MediaSearchContainer, {mapDispatchToProps} from '../index';
import debounce from 'lodash.debounce';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';
jest.mock('lodash.debounce');
jest.useFakeTimers();

describe('<MediaSearchContainer/>', () => {
    const setSearchFilters = jest.fn();
    debounce.mockImplementation((fn) => fn);

    const defaultProps = {
        mediaType: 'games',
        id: 'test_id',
        label: 'search',
        setSearchFilters,
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
        error: false,
    };

    beforeEach(() => {
        setSearchFilters.mockClear();
    });

    it('tests MediaSearchContainer with games props', () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = renderWithBaseWrapper(
            <MediaSearchContainer {...defaultProps} />,
            store
        );
        const searchInput = wrapper.getByLabelText('search');
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'test input'}});
        });
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('SET_GAMES_SEARCH_FILTERS');
    });

    it('tests MediaSearchContainer with companies props', () => {
        const store = mockStore({companies: defaultStoreProps});
        const wrapper = renderWithBaseWrapper(
            <MediaSearchContainer
                {...{...defaultProps, mediaType: 'companies'}}
            />,
            store
        );
        const searchInput = wrapper.getByLabelText('search');
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'test input'}});
        });
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual(
            'SET_COMPANIES_SEARCH_FILTERS'
        );
    });

    it('tests MediaSearchContainer with franchises props', () => {
        const store = mockStore({companies: defaultStoreProps});
        const wrapper = renderWithBaseWrapper(
            <MediaSearchContainer
                {...{...defaultProps, mediaType: 'franchises'}}
            />,
            store
        );
        const searchInput = wrapper.getByLabelText('search');
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'test input'}});
        });
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual(
            'SET_FRANCHISES_SEARCH_FILTERS'
        );
    });
});

describe('<MediaSearchContainer/> funcs', () => {
    it('tests mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const props1 = mapDispatchToProps(dispatch, {mediaType: 'test'});
        expect(props1).toEqual({});
        const props2 = mapDispatchToProps(dispatch, {mediaType: 'games'});
        expect(props2.setSearchFilters).toBeTruthy();
        const props3 = mapDispatchToProps(dispatch, {mediaType: 'companies'});
        expect(props3.setSearchFilters).toBeTruthy();
        const props4 = mapDispatchToProps(dispatch, {mediaType: 'franchises'});
        expect(props4.setSearchFilters).toBeTruthy();
    });
});
