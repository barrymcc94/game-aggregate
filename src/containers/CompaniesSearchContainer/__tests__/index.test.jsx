import React from "react";
import Container, {CompaniesSearchContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {Provider} from 'react-redux'
import {mockStore} from '../../../../tests/setup';
import debounce from 'lodash.debounce';
jest.mock('lodash.debounce');
jest.useFakeTimers();

describe('<CompaniesSearchContainer/>', () => {
    const setCompaniesSearchFilters = jest.fn();
    const clearCompaniesState = jest.fn();

    const defaultProps = {
        searchLabel: 'test',
        setCompaniesSearchFilters,
        clearCompaniesState
    };

    beforeEach(() => {
        setCompaniesSearchFilters.mockClear();
        clearCompaniesState.mockClear();
    });

    it('tests Container Component with offset larger than total', () => {
        mountWithBaseWrapper(<CompaniesSearchContainer {...defaultProps} />);
        expect(setCompaniesSearchFilters).toBeCalledTimes(0);
        expect(clearCompaniesState).toBeCalledTimes(0);
    });

    it('tests mounting with store', () => {
        debounce.mockImplementation(fn => fn);

        const store = mockStore({
            companies: {
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

        wrapper.find('input').simulate('change', {target: {value: 'test input'} });
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('SET_COMPANIES_SEARCH_FILTERS');
        expect(store.getActions()[0].payload.filter).toMatch(/(name:test%20input)/);
    });
});