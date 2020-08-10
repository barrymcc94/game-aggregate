import React from 'react';
import Container, {MediaContainer} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';

describe('<MediaContainer/>', () => {
    const fetchItem = jest.fn(() => {});

    const defaultProps = {
        guid: '123',
        item: {guid: '123'},
        isFetching: false,
        error: false,
        fetchItem,
    };

    beforeEach(() => {
        fetchItem.mockClear();
    });

    it('tests Container Component (games)', () => {
        mountWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: 'games'}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component (companies)', () => {
        mountWithBaseWrapper(
            <MediaContainer
                {...{...defaultProps, mediaType: 'companies', gamesData: {}}}
            />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component (franchises)', () => {
        mountWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: 'franchises'}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests invalid mediaItem in Component', () => {
        mountWithBaseWrapper(
            <MediaContainer
                {...{...defaultProps, mediaType: null, item: null}}
            />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component with invalid mediaytype', () => {
        mountWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: 'mediaType'}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component with no mediaytype', () => {
        mountWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: null}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests loaded Container Component', () => {
        const props = {
            ...defaultProps,
            mediaType: 'games',
            item: {guid: '123', developers: []},
        };
        mountWithBaseWrapper(<MediaContainer {...props} />);
        expect(fetchItem).toBeCalledTimes(0);
    });

    it('tests loaded Container Component', async () => {
        const store = mockStore({game: {}, games: {}});
        await mountWithBaseWrapper(
            <Container {...{...defaultProps, mediaType: ''}} />,
            store
        );
        expect(store.getActions().length).toEqual(0);
    });
});
