import React from 'react';
import Companies, {submitForm} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Companies/>', () => {
    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <Companies match={{params: {guid: 'test'}}} />
            )
        ).toBeTruthy();
    });
});
