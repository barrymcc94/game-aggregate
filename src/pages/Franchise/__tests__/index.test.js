import React from 'react';
import Franchise from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Franchise/>', () => {
    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <Franchise match={{params: {guid: 'test'}}} />
            )
        ).toBeTruthy();
    });
});
