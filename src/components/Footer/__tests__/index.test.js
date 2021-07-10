import React from 'react';
import Footer from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Footer/>', () => {
    it('renders correctly', () => {
        const wrapper = renderWithBaseWrapper(<Footer />);
        expect(wrapper.getByTestId('footer')).toBeTruthy();
    });
});
