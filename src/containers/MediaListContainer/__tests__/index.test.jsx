import React from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import Container, {
    MediaListContainer,
    mapStateToProps,
    mapDispatchToProps,
} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';

jest.mock('lodash.throttle');
jest.mock('lodash.debounce');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);
debounce.mockImplementation((fn) => fn);

describe('<MediaListContainer/>', () => {
    const loadMore = jest.fn(() => {});
    const fetchItems = jest.fn(() => {});

    const defaultProps = {
        id: '1',
        mediaType: 'games',
        preFiltered: false,
        disableScrollLoading: false,
        items: [],
        error: false,
        isFetching: false,
        queryOverwrite: {filter: {}},
        query: {
            offset: 0,
            limit: 10,
            total: -1,
            filter: {},
        },
        fetchItems,
    };

    const defaultStoreProps = {
        byId: {},
        ids: [],
        query: {
            limit: 50,
            offset: 0,
            total: -1,
            filter: {},
        },
        isFetching: false,
        error: false,
    };

    beforeEach(() => {
        loadMore.mockClear();
        fetchItems.mockClear();
    });

    it('test component initial mount (games)', async () => {
        const store = mockStore({games: defaultStoreProps});
        await renderWithBaseWrapper(<Container {...defaultProps} />, store);
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('FETCH_GAMES_STARTED');
    });

    it('test component initial mount (companies)', async () => {
        const store = mockStore({
            companies: {
                1: {
                    defaultStoreProps,
                    query: {
                        offset: 0,
                        limit: 10,
                        total: 10,
                        filter: {},
                    },
                },
            },
        });
        await renderWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: 'companies'}} />,
            store
        );
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('FETCH_COMPANIES_STARTED');
    });

    it('test component initial mount (franchises)', async () => {
        const store = mockStore({franchises: {1: defaultStoreProps}});
        await renderWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: 'franchises'}} />,
            store
        );
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('FETCH_FRANCHISES_STARTED');
    });

    it('test component mount and unmount with carousel', async () => {
        const store = mockStore({games: {1: defaultStoreProps}});
        const wrapper = await renderWithBaseWrapper(
            <Container
                {...{...defaultProps, mediaType: 'games', isCarousel: true}}
            />,
            store
        );
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('FETCH_GAMES_STARTED');
        wrapper.unmount();
    });

    it('tests scrolling loads more when within 500px from bottom of component', () => {
        const store = mockStore({games: {1: defaultStoreProps}});
        renderWithBaseWrapper(
            <Container {...{...defaultProps, preFiltered: true}} />,
            store
        );
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(store.getActions()[0].type).toEqual('FETCH_GAMES_STARTED');
    });

    it('tests scrolling does not load more when disableScrollLoading prop is true', () => {
        const store = mockStore({games: {1: defaultStoreProps}});
        const wrapper = renderWithBaseWrapper(
            <Container {...{...defaultProps, disableScrollLoading: true}} />,
            store
        );
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(store.getActions().length).toEqual(1);
    });
    it('tests scrolling does not load more when pagination data is not valid', () => {
        const store = mockStore({
            games: {
                1: {
                    ...defaultStoreProps,
                    query: {
                        offset: 10,
                        limit: 10,
                        total: 10,
                        filter: {},
                    },
                },
            },
        });
        renderWithBaseWrapper(<Container {...defaultProps} />, store);
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(store.getActions().length).toEqual(1);
    });

    it('tests scrolling does not load more when over 500px from bottom of component', () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = renderWithBaseWrapper(
            <Container {...defaultProps} />,
            store
        );
        global.innerHeight = 0;
        global.pageYOffset = -501;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(store.getActions().length).toEqual(1);
    });

    it('tests mounting with search containerType', async () => {
        await renderWithBaseWrapper(
            <MediaListContainer
                {...{
                    ...defaultProps,
                    preFiltered: false,
                }}
            />
        );
        expect(fetchItems).toBeCalledTimes(1);
    });

    it('tests mounting with search & allowing to initially fetch', async () => {
        await renderWithBaseWrapper(
            <MediaListContainer
                {...{
                    ...defaultProps,
                    mediaType: null,
                    preFiltered: false,
                }}
            />
        );
        expect(fetchItems).toBeCalledTimes(1);
    });
});

describe('<MediaListContainer/> funcs', () => {
    it('tests mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const props1 = mapDispatchToProps(dispatch, {mediaType: 'test'});
        expect(props1).toEqual({});
        const props2 = mapDispatchToProps(dispatch, {mediaType: 'games'});
        expect(props2.fetchItems).toBeTruthy();
        const props3 = mapDispatchToProps(dispatch, {mediaType: 'companies'});
        expect(props3.fetchItems).toBeTruthy();
        const props4 = mapDispatchToProps(dispatch, {mediaType: 'franchises'});
        expect(props4.fetchItems).toBeTruthy();
    });

    it('tests mapStateToProps', () => {
        const props1 = mapStateToProps({}, {mediaType: 'test', id: 'test'});
        expect(props1).toEqual({
            error: false,
            isFetching: false,
            items: [],
            query: {
                filter: {},
            },
        });

        const props2 = mapStateToProps(
            {games: {test: {isFetching: false, error: false, query: {}}}},
            {mediaType: 'games', id: 'test'}
        );
        expect(props2).toEqual({
            error: false,
            isFetching: false,
            items: [],
            query: {},
        });

        const props3 = mapStateToProps(
            {
                companies: {test: {isFetching: false, error: false, query: {}}},
            },
            {mediaType: 'companies', id: 'test'}
        );
        expect(props3).toEqual({
            error: false,
            isFetching: false,
            items: [],
            query: {},
        });

        const props4 = mapStateToProps(
            {
                franchises: {
                    test: {isFetching: false, error: false, query: {}},
                },
            },
            {mediaType: 'franchises', id: 'test'}
        );
        expect(props4).toEqual({
            error: false,
            isFetching: false,
            items: [],
            query: {},
        });
    });
});
