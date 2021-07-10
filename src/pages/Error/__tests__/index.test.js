import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import Error from '../index';

describe('<Error/>', () => {
    it('renders page successfully', () => {
        expect(renderWithBaseWrapper(<Error />)).toBeTruthy();
    });
});
