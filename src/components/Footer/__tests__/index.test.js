import React from 'react';
import Footer from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<Footer/>', () => {
    it('renders correctly', () => {
        expect(mountWithBaseWrapper(<Footer />)).toMatchSnapshot();
    });
});
