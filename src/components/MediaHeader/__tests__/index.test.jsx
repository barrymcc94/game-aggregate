import React from "react";
import {MediaHeader} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledMediaHeader} from '../styles';
import {StyledSkeletonLoader} from "../../SkeletonLoader/styles";

describe('<MediaHeader/>', () => {
    const defaultProps = {
        isFetching: false,
        game: {
            name: 'test name',
            deck: 'test deck',
            image: {small_url: 'test_image'},
            aliases: 'test alias',
            site_detail_url: 'test_url',
            original_release_date: '2020-06-19'
        }
    };

    it('renders loader when isFetching is true', () => {
        const wrapper = mountWithBaseWrapper(<MediaHeader {...{...defaultProps, isLoading: true}} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.find(StyledSkeletonLoader)).toHaveLength(5);
    });

    it('renders as expected with game data', () => {
        const wrapper = mountWithBaseWrapper(<MediaHeader {...defaultProps} intl={{formatMessage: jest.fn()}} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(StyledMediaHeader)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});