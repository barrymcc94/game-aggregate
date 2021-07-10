import React from 'react';
import {MediaHeader, isEqual} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaHeader/>', () => {
    const defaultProps = {
        isLoading: false,
        item: {
            name: 'test name',
            deck: 'test deck',
            image: {small_url: 'test_image'},
            aliases: 'test alias',
            site_detail_url: 'test_url',
            original_release_date: '2020-06-19',
            date_founded: '2000-06-19',
        },
    };

    it('renders loader when isFetching is true', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaHeader {...{...defaultProps, isLoading: true}} />
        );
        expect(wrapper.getAllByTestId('loader').length).toEqual(5);
        expect(wrapper.queryAllByTestId('media-header').length).toEqual(1);
    });

    it('renders as expected with game data', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaHeader {...defaultProps} intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
        expect(wrapper.getAllByTestId('media-header').length).toEqual(1);
    });

    it('tests isEqual function', () => {
        expect(
            isEqual(
                {isLoading: true, item: {guid: '1'}},
                {isLoading: true, item: {guid: '1'}}
            )
        ).toEqual(true);
        expect(
            isEqual(
                {isLoading: true, item: {guid: '1'}},
                {isLoading: false, item: {guid: '1'}}
            )
        ).toEqual(false);
    });
});
