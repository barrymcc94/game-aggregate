import React from "react";
import {GameDetails} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {GameDetailsSection} from '../styles';
import {StyledSkeletonLoader} from "../../SkeletonLoader/styles";

describe('<GameDetails />', () => {
    const genericObj = {
        api_detail_url: 'api_detail_url',
        id: 1,
        name: 'name',
        site_detail_url: 'site_detail_url',
    };
    const defaultProps = {
        isFetching: false,
        game: {
            franchises: [genericObj],
            genres: [genericObj],
            publishers: [genericObj],
            developers: [genericObj],
            themes: [genericObj],
            platforms: null,
        }
    };

    it('renders loader when isFetching is true', () => {
        const wrapper = mountWithBaseWrapper(<GameDetails {...{...defaultProps, isLoading: true}} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(GameDetailsSection)).toBe(true);
    });

    it('renders as expected', () => {
        const wrapper = mountWithBaseWrapper(<GameDetails {...defaultProps} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(GameDetailsSection)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});