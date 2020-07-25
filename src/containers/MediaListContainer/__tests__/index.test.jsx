import React from "react";
import Container, {MediaListContainer, hasFiltersSearchTerm} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaListContainer/> functions', () => {
    it('invokes hasFiltersSearchTerm as expected', () => {
        const hasTerm1 = hasFiltersSearchTerm({filter: 'test:123,name:'});
        const hasTerm2 = hasFiltersSearchTerm({filter: 'test:123,name:123'});
        const hasTerm3 = hasFiltersSearchTerm({});
        expect(hasTerm1).toEqual(false);
        expect(hasTerm2).toEqual(true);
        expect(hasTerm3).toEqual(false);
    });
})

describe('<MediaListContainer/>', () => {
    const loadMore = jest.fn(() => {});
    const fetchItems = jest.fn(() => {});
    const clearState = jest.fn(() => Promise.resolve());

    const defaultProps = {
        items: [],
        error: false,
        isFetching: false,
        containerType: 'all',
        disableScrollLoading: false,
        meta: {
            offset: 0,
            limit: 10,
            total: -1,
            filters: {},
        },
        queryObj: {},
        fetchItems,
        clearState,
    };

    beforeEach(() => {
        loadMore.mockClear();
        fetchItems.mockClear();
        clearState.mockClear();
    });

    it('tests scrolling loads more when over 80% down page', () => {
        mountWithBaseWrapper(<Container {...defaultProps} />);
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(fetchItems).toBeCalledTimes(1);
    });

    it('tests scrolling does not load more when disableScrollLoading prop is true', () => {
        const wrapper = mountWithBaseWrapper(<Container {...{...defaultProps, disableScrollLoading: true}} />);
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(fetchItems).toBeCalledTimes(0);
    });

    it('tests scrolling does not load more when less than 80% down page', () => {
        mountWithBaseWrapper(<Container {...defaultProps} />);
        global.innerHeight = 0;
        global.pageYOffset = -1;
        global.dispatchEvent(new Event('scroll'));
        expect(fetchItems).toBeCalledTimes(0);
    });

    it('tests component updates as expected', () => {
        const wrapper = mountWithBaseWrapper(<MediaListContainer {...defaultProps} />);
        wrapper.setProps({...defaultProps, containerType: 'all', meta: {filters: {filter: 'test'}}});
        wrapper.setProps({...defaultProps, containerType: 'search', meta: {filters: {filter: 'test'}}});
        wrapper.setProps({...defaultProps, isFetching: true, containerType: 'search', meta: {filters: {filter: 'test'}}});
        expect(clearState).toBeCalledTimes(2);
    });

    it('tests mounting with search containerType', async () => {
        await mountWithBaseWrapper(<MediaListContainer {...{
            ...defaultProps,
            containerType: 'search'
        }} />);
        expect(fetchItems).toBeCalledTimes(0);
    });

    it('tests fetchItems is not called again when search is empty', async () => {
        const wrapper = await mountWithBaseWrapper(<MediaListContainer {...{
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

        wrapper.setProps({meta: {
            offset: 10,
            limit: 10,
            total: 100,
            filters: {filter: 'test:123,name:'},
        }});

        expect(fetchItems).toBeCalledTimes(1);
        expect(clearState).toBeCalledTimes(2);
    });
});