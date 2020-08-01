import React from "react";
import Container, {CompaniesContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {Provider} from 'react-redux'
import {mockStore} from '../../../../tests/setup';

describe('<CompaniesContainer/>', () => {
    const fetchCompanies = jest.fn(() => {});
    const clearCompaniesState = jest.fn(() => Promise.resolve());

    const defaultProps = {
        containerType: 'all',
        isFetching: false,
        error: false,
        meta: {
            offset: 0,
            limit: 10,
            total: -1,
            filters: {},
        },
        fetchCompanies,
        clearCompaniesState,
    };

    beforeEach(() => {
        fetchCompanies.mockClear();
        clearCompaniesState.mockClear();
    });

    it('tests Container Component with offset larger than total', () => {
        mountWithBaseWrapper(<CompaniesContainer {...{
            ...defaultProps,
            meta: {
                offset: 10,
                total: 5,
            }
        }} />);
        expect(fetchCompanies).toBeCalledTimes(0);
    });

    it('tests mounting with store', async () => {
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
        const wrapper = await mountWithBaseWrapper(<Provider store={store}><Container /></Provider>);
        wrapper.unmount();
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_COMPANIES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_COMPANIES_STARTED');
    });
});