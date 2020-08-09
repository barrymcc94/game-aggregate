import React from 'react';
import {GameDetails, isEqual} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {GameDetailsSection} from '../styles';
import {StyledSkeletonLoader} from '../../SkeletonLoader/styles';

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
        const wrapper = mountWithBaseWrapper(
            <GameDetails {...{...defaultProps, isLoading: true}} />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(GameDetailsSection)).toBe(true);
    });

    it('renders as expected', () => {
        const wrapper = mountWithBaseWrapper(<GameDetails {...defaultProps} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(GameDetailsSection)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders as expected when publisher guid is not available', () => {
        const props = {
            ...defaultProps,
            game: {...defaultProps.game, publishers: [{id: 123}]},
        };
        const wrapper = mountWithBaseWrapper(<GameDetails {...props} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(GameDetailsSection)).toBe(true);
        expect(wrapper).toMatchSnapshot();
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
