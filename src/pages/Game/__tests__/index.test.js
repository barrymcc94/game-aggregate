import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import Game from '../index';

describe('<Game/>', () => {
    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(<Game match={{params: {guid: 'test'}}} />)
        ).toBeTruthy();
    });
});
