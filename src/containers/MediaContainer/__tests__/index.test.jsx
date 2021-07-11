import React from 'react';
import {
    MediaContainer,
    isItemLoaded,
    mapStateToProps,
    mapDispatchToProps,
} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaContainer/> functions', () => {
    it('tests isItemLoaded', () => {
        expect(isItemLoaded('games', null)).toEqual(false);
        expect(isItemLoaded('games', {developers: []})).toEqual(true);
        expect(isItemLoaded('companies', {developed_games: []})).toEqual(true);
        expect(isItemLoaded('franchises', {games: []})).toEqual(true);
        expect(isItemLoaded('', null)).toEqual(false);
        expect(isItemLoaded('', {})).toEqual(false);
    });
    it('tests mapStateToProps', () => {
        const props1 = mapStateToProps({}, {mediaType: '', guid: 'test'});
        expect(props1).toEqual({});

        const props2 = mapStateToProps(
            {games: {byId: {}, ids: []}},
            {mediaType: 'games', guid: 'test'}
        );
        expect(props2).toEqual({});

        const props3 = mapStateToProps(
            {companies: {byId: {}, ids: []}},
            {mediaType: 'companies', guid: 'test'}
        );
        expect(props3).toEqual({});

        const props4 = mapStateToProps(
            {franchises: {byId: {}, ids: []}},
            {mediaType: 'franchises', guid: 'test'}
        );
        expect(props4).toEqual({});
    });

    it('tests mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const props1 = mapDispatchToProps(dispatch, {mediaType: 'test'});
        expect(props1).toEqual({});
        const props2 = mapDispatchToProps(dispatch, {mediaType: 'games'});
        expect(props2.fetchItem).toBeTruthy();
        const props3 = mapDispatchToProps(dispatch, {mediaType: 'companies'});
        expect(props3.fetchItem).toBeTruthy();
        const props4 = mapDispatchToProps(dispatch, {mediaType: 'franchises'});
        expect(props4.fetchItem).toBeTruthy();
    });
});

describe('<MediaContainer/>', () => {
    const fetchItem = jest.fn(() => {});

    const defaultProps = {
        guid: '123',
        item: {guid: '123'},
        isFetching: false,
        error: false,
        fetchItem,
        intl: {formatMessage: () => 'message'},
    };

    beforeEach(() => {
        fetchItem.mockClear();
    });

    it('tests Container Component (games)', () => {
        renderWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: 'games'}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component (companies)', () => {
        renderWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: 'companies'}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component (franchises)', () => {
        renderWithBaseWrapper(
            <MediaContainer {...{...defaultProps, mediaType: 'franchises'}} />
        );
        expect(fetchItem).toBeCalledTimes(1);
    });

    it('tests Container Component (null)', () => {
        renderWithBaseWrapper(
            <MediaContainer
                {...{...defaultProps, guid: null, mediaType: null}}
            />
        );
        expect(fetchItem).toBeCalledTimes(0);
    });

    it('tests loaded Container Component', () => {
        const props = {
            ...defaultProps,
            mediaType: 'games',
            item: {guid: '123', developers: []},
        };
        renderWithBaseWrapper(<MediaContainer {...props} />);
        expect(fetchItem).toBeCalledTimes(0);
    });
});
