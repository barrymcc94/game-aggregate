import React from 'react';
import {GameFooter, isEqual} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<GameFooter/>', () => {
    const defaultProps = {
        isLoading: false,
    };

    it('renders loader when isLoading is true', () => {
        const wrapper = renderWithBaseWrapper(
            <GameFooter {...{...defaultProps, isLoading: true}} />
        );
        expect(wrapper.getAllByTestId('loader').length).toEqual(1);
        expect(wrapper.getByTestId('footer')).toBeTruthy();
    });

    it('renders as expected', () => {
        const wrapper = renderWithBaseWrapper(<GameFooter {...defaultProps} />);
        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
        expect(wrapper.getByTestId('footer')).toBeTruthy();
    });

    it('tests isEqual function', () => {
        expect(isEqual({isLoading: true}, {isLoading: true})).toEqual(true);
        expect(isEqual({isLoading: true}, {isLoading: false})).toEqual(false);
    });
});
