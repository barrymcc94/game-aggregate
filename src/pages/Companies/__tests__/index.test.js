import React from 'react';
import Companies from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Companies/>', () => {
    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <Companies match={{params: {guid: 'test'}}} />
            )
        ).toBeTruthy();
    });
});
