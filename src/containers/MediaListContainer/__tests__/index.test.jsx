import React from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import Container, {
    MediaListContainer,
    mapStateToProps,
    mapDispatchToProps,
} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';

jest.mock('lodash.throttle');
jest.mock('lodash.debounce');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);
debounce.mockImplementation((fn) => fn);

describe('<MediaListContainer/>', () => {
    const loadMore = jest.fn(() => {});
    const fetchItems = jest.fn(() => {});
    const clearState = jest.fn(() => Promise.resolve());

    const defaultProps = {
        mediaType: 'games',
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

    it('test component mount and unmount with carousel', async () => {
        const store = mockStore({games: defaultStoreProps});
        const wrapper = await mountWithBaseWrapper(
            <Container
                {...{...defaultProps, mediaType: 'games', isCarousel: true}}
            />,
            store
        );
        expect(store.getActions().length).toEqual(2);
        expect(store.getActions()[0].type).toEqual('CLEAR_GAMES_STATE');
        expect(store.getActions()[1].type).toEqual('FETCH_GAMES_STARTED');
        wrapper.unmount();
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
        wrapper.setProps({
            ...defaultProps,
            containerType: 'filtered',
        });
        expect(clearState).toBeCalledTimes(1);
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
        expect(fetchItems).toBeCalledTimes(1);
    });

    it('tests mounting with search & allowing to initially fetch', async () => {
        await mountWithBaseWrapper(
            <MediaListContainer
                {...{
                    ...defaultProps,
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

        expect(fetchItems).toBeCalledTimes(2);
        expect(clearState).toBeCalledTimes(1);
    });
});

describe('<MediaListContainer/> funcs', () => {
    it('tests mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const props1 = mapDispatchToProps(dispatch, {mediaType: 'test'});
        expect(props1).toEqual({});
        const props2 = mapDispatchToProps(dispatch, {mediaType: 'games'});
        expect(props2.clearState).toBeTruthy();
        expect(props2.fetchItems).toBeTruthy();
        const props3 = mapDispatchToProps(dispatch, {mediaType: 'companies'});
        expect(props3.clearState).toBeTruthy();
        expect(props3.fetchItems).toBeTruthy();
        const props4 = mapDispatchToProps(dispatch, {mediaType: 'franchises'});
        expect(props4.clearState).toBeTruthy();
        expect(props4.fetchItems).toBeTruthy();
    });

    it('tests mapStateToProps', () => {
        const props1 = mapStateToProps({}, {mediaType: 'test', id: 'test'});
        expect(props1).toEqual({
            error: false,
            isFetching: false,
            meta: {
                filters: {},
            },
        });

        const props2 = mapStateToProps(
            {games: {test: {isFetching: false, error: false, meta: {}}}},
            {mediaType: 'games', id: 'test'}
        );
        expect(props2).toEqual({
            error: false,
            isFetching: false,
            items: [],
            meta: {},
        });

        const props3 = mapStateToProps(
            {
                companies: {
                    byId: {},
                    ids: [],
                    isFetching: false,
                    error: false,
                    meta: {},
                },
            },
            {mediaType: 'companies'}
        );
        expect(props3).toEqual({
            error: false,
            isFetching: false,
            items: [],
            meta: {},
        });

        const props4 = mapStateToProps(
            {
                franchises: {
                    byId: {},
                    ids: [],
                    isFetching: false,
                    error: false,
                    meta: {},
                },
            },
            {mediaType: 'franchises'}
        );
        expect(props4).toEqual({
            error: false,
            isFetching: false,
            items: [],
            meta: {},
        });
    });
});
