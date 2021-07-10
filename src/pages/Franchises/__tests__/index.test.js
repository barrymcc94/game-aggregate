import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {FranchisesPage, submitForm} from '../index';

describe('<FranchisesPage/>', () => {
    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <FranchisesPage intl={{formatMessage: () => ''}} />
            )
        ).toBeTruthy();
    });
});
