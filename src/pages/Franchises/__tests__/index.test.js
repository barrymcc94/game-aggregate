import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {FranchisesPage} from '../index';

describe('<FranchisesPage/>', () => {
    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <FranchisesPage intl={{formatMessage: () => ''}} />
            )
        ).toBeTruthy();
    });
});
