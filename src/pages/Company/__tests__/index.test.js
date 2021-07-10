import React from 'react';
import Company from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Company/>', () => {
    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(<Company match={{params: {guid: 'test'}}} />)
        ).toBeTruthy();
    });
});
