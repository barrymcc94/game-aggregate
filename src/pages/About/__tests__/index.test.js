import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import About from '../index';

describe('<About/>', () => {
    it('renders page successfully', () => {
        expect(renderWithBaseWrapper(<About />)).toBeTruthy();
    });
});
