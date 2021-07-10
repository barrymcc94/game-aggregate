import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {GamesPage, submitForm} from '../index';

describe('<GamesPage/>', () => {
    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <GamesPage intl={{formatMessage: () => ''}} />
            )
        ).toBeTruthy();
    });
});
