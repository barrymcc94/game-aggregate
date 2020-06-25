import React from "react";
import {GameFooter} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledGameFooter} from '../styles';
import {StyledLoaderContainer} from "../../Loader/styles";

describe('<GameFooter/>', () => {
    const defaultProps = {
        isFetching: false,
    };

    it('renders loader when isFetching is true', () => {
        const wrapper = mountWithBaseWrapper(<GameFooter {...{...defaultProps, isFetching: true}} />);
        expect(wrapper.exists(StyledLoaderContainer)).toBe(true);
        expect(wrapper.exists(StyledGameFooter)).toBe(false);
    });

    it('renders as expected', () => {
        const wrapper = mountWithBaseWrapper(<GameFooter {...defaultProps} />);
        expect(wrapper.exists(StyledLoaderContainer)).toBe(false);
        expect(wrapper.exists(StyledGameFooter)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});