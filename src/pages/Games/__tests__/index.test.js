import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {GamesPage} from '../index';

describe('<GamesPage/>', () => {
    it('renders page successfully', () => {
        expect(
            renderWithBaseWrapper(
                <GamesPage intl={{formatMessage: () => ''}} />
            )
        ).toBeTruthy();
    });
});
