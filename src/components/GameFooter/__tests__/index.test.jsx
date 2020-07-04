import React from "react";
import {GameFooter} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledGameFooter} from '../styles';
import {StyledSkeletonLoader} from "../../SkeletonLoader/styles";

describe('<GameFooter/>', () => {
    const defaultProps = {
        isFetching: false,
    };

    it('renders loader when isFetching is true', () => {
        const wrapper = mountWithBaseWrapper(<GameFooter {...{...defaultProps, isLoading: true}} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(StyledGameFooter)).toBe(true);
    });

    it('renders as expected', () => {
        const wrapper = mountWithBaseWrapper(<GameFooter {...defaultProps} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(StyledGameFooter)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});