import React from "react";
import {GameHeader} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledGameHeader} from '../styles';
import {StyledLoaderContainer} from "../../Loader/styles";

describe('<GameHeader/>', () => {
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
        const wrapper = mountWithBaseWrapper(<GameHeader {...{...defaultProps, isFetching: true}} />);
        expect(wrapper.exists(StyledLoaderContainer)).toBe(true);
        expect(wrapper.exists(StyledGameHeader)).toBe(false);
    });

    it('renders as expected with game data', () => {
        const wrapper = mountWithBaseWrapper(<GameHeader {...defaultProps} />);
        expect(wrapper.exists(StyledLoaderContainer)).toBe(false);
        expect(wrapper.exists(StyledGameHeader)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});