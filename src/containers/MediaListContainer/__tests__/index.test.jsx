import React from 'react';
import Container, {
    MediaListContainer,
    hasFiltersSearchTerm,
    getDefaultFilters,
} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';

describe('<MediaListContainer/> functions', () => {
    it('invokes hasFiltersSearchTerm as expected', () => {
        const hasTerm1 = hasFiltersSearchTerm({filter: 'test:123,name:'});
        const hasTerm2 = hasFiltersSearchTerm({filter: 'test:123,name:123'});
        const hasTerm3 = hasFiltersSearchTerm({});
        expect(hasTerm1).toEqual(false);
        expect(hasTerm2).toEqual(true);
        expect(hasTerm3).toEqual(false);
    });

    it('tests getDefaultFilters works as expected', () => {
        Date.now = jest
            .fn()
            .mockReturnValue(new Date('2020-06-15T00:00:00.000Z'));
        const expectedVal = {
            format: 'json',
            api_key: undefined,
            limit: 10,
            offset: 0,
        };
        expect(getDefaultFilters('games', {limit: 10, offset: 0})).toEqual({
            ...expectedVal,
            sort: 'original_release_date:desc',
            filter: 'original_release_date:|2020-6-14 00:00:00',
        });
        expect(getDefaultFilters('companies', {limit: 10, offset: 0})).toEqual({
            ...expectedVal,
            filter: '',
            sort: 'date_founded:desc',
        });
        expect(getDefaultFilters('franchises', {limit: 10, offset: 0})).toEqual(
            {
                ...expectedVal,
                filter: '',
            }
        );
        expect(getDefaultFilters('test', {limit: 10, offset: 0})).toEqual({
            ...expectedVal,
        });
        expect(getDefaultFilters('', null)).toEqual({});
    });
});

describe('<MediaListContainer/>', () => {
    const loadMore = jest.fn(() => {});
    const fetchItems = jest.fn(() => {});
    const clearState = jest.fn(() => Promise.resolve());

    const defaultProps = {
        mediaType: 'games',
        allowEmptySearchFilter: false,
        containerType: 'all',
        disableScrollLoading: false,
        items: [],
        error: false,
        isFetching: false,
        meta: {
            offset: 0,
            limit: 10,
            total: -1,
            filters: {},
        },
        fetchItems,
        clearState,
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
        loadMore.mockClear();
        fetchItems.mockClear();
        clearState.mockClear();
    });

    it('test component initial mount (games)', async () => {
        const store = mockStore({games: defaultStoreProps});
        await mountWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: 'games'}} />,
            store
        );
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_GAMES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_GAMES_STARTED');
    });

    it('test component initial mount (companies)', async () => {
        const store = mockStore({companies: defaultStoreProps});
        await mountWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: 'companies'}} />,
            store
        );
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_COMPANIES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_COMPANIES_STARTED');
    });

    it('test component initial mount (franchises)', async () => {
        const store = mockStore({franchises: defaultStoreProps});
        await mountWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: 'franchises'}} />,
            store
        );
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_FRANCHISES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_FRANCHISES_STARTED');
    });

    it('tests redux connection when mediatype is invalid', () => {
        const store = mockStore({games: defaultStoreProps});
        mountWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: ''}} />,
            store
        );
        expect(store.getActions().length).toEqual(0);
    });

    it('tests scrolling loads more when over 80% down page', () => {
        const store = mockStore({games: defaultStoreProps});
        mountWithBaseWrapper(<Container {...defaultProps} />, store);
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_GAMES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_GAMES_STARTED');
    });

    it('tests scrolling does not load more when disableScrollLoading prop is true', () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = mountWithBaseWrapper(
            <Container {...{...defaultProps, disableScrollLoading: true}} />,
            store
        );
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('CLEAR_GAMES_STATE');
    });

    it('tests scrolling does not load more when less than 80% down page', () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = mountWithBaseWrapper(
            <Container {...defaultProps} />,
            store
        );
        global.innerHeight = 0;
        global.pageYOffset = -1;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('CLEAR_GAMES_STATE');
    });

    it('tests component updates as expected', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaListContainer {...defaultProps} />
        );
        wrapper.setProps({
            ...defaultProps,
            containerType: 'all',
            meta: {filters: {filter: 'test'}},
        });
        wrapper.setProps({
            ...defaultProps,
            containerType: 'search',
            meta: {filters: {filter: 'test'}},
        });
        wrapper.setProps({
            ...defaultProps,
            isFetching: true,
            containerType: 'search',
            meta: {filters: {filter: 'test'}},
        });
        expect(clearState).toBeCalledTimes(2);
    });

    it('tests mounting with search containerType', async () => {
        await mountWithBaseWrapper(
            <MediaListContainer
                {...{
                    ...defaultProps,
                    containerType: 'search',
                }}
            />
        );
        expect(fetchItems).toBeCalledTimes(0);
    });

    it('tests mounting with search & allowing to initially fetch', async () => {
        await mountWithBaseWrapper(
            <MediaListContainer
                {...{
                    ...defaultProps,
                    allowEmptySearchFilter: true,
                    mediaType: null,
                    containerType: 'search',
                }}
            />
        );
        expect(fetchItems).toBeCalledTimes(1);
    });

    it('tests fetchItems is not called again when search is empty', async () => {
        const wrapper = await mountWithBaseWrapper(
            <MediaListContainer
                {...{
                    ...defaultProps,
                    ...{
                        meta: {
                            offset: 10,
                            limit: 10,
                            total: 100,
                            filters: {filter: 'test:123,name:123'},
                        },
                    },
                    containerType: 'search',
                }}
            />
        );

        wrapper.setProps({
            meta: {
                offset: 10,
                limit: 10,
                total: 100,
                filters: {filter: 'test:123,name:'},
            },
        });

        expect(fetchItems).toBeCalledTimes(1);
        expect(clearState).toBeCalledTimes(2);
    });
});
