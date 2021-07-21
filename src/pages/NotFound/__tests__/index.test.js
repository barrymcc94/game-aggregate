import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import NotFoundPage from '../index';

describe('<NotFoundPage/>', () => {
    it('renders page successfully', () => {
        expect(renderWithBaseWrapper(<NotFoundPage />)).toBeTruthy();
    });
});
