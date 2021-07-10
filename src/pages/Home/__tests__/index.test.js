import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import Home from '../index';

describe('<Home/>', () => {
    it('renders page successfully', () => {
        expect(renderWithBaseWrapper(<Home />)).toBeTruthy();
    });
});
