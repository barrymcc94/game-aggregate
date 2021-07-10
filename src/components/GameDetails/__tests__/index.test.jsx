import React from 'react';
import {GameDetails, isEqual} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<GameDetails />', () => {
    const genericObj = {
        api_detail_url: 'api_detail_url',
        id: 1,
        name: 'name',
        site_detail_url: 'site_detail_url',
    };
    const defaultProps = {
        isLoading: false,
        game: {
            franchises: [genericObj],
            genres: [genericObj],
            publishers: [genericObj],
            developers: [genericObj],
            themes: [genericObj],
            platforms: null,
        },
    };

    it('renders loader when isLoading is true', () => {
        const wrapper = renderWithBaseWrapper(
            <GameDetails {...{...defaultProps, isLoading: true}} />
        );
        expect(wrapper.getAllByTestId('loader').length).toEqual(6);
    });

    it('renders as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <GameDetails {...defaultProps} />
        );
        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
    });

    it('renders as expected when publisher guid is not available', () => {
        const props = {
            ...defaultProps,
            game: {...defaultProps.game, publishers: [{id: 123}]},
        };
        const wrapper = renderWithBaseWrapper(<GameDetails {...props} />);
        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
    });

    it('tests isEqual function', () => {
        expect(
            isEqual(
                {isLoading: true, game: {guid: '1'}},
                {isLoading: true, game: {guid: '1'}}
            )
        ).toEqual(true);
        expect(
            isEqual(
                {isLoading: true, game: {guid: '1'}},
                {isLoading: false, game: {guid: '1'}}
            )
        ).toEqual(false);
    });
});
