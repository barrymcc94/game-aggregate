import React from 'react';
import {act, fireEvent} from '@testing-library/react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {Header} from '../index';
/*eslint-disable */
jest.mock('@mui/material/Zoom', () => ({children}) => <div>{children}</div>);
/*eslint-enable */

describe('<Header/>', () => {
    it('opens and closes side menu through open & close button click', () => {
        const wrapper = renderWithBaseWrapper(
            <Header intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper.getByTestId('open-menu-button')).toBeTruthy();
        act(() => {
            fireEvent.click(wrapper.getByTestId('open-menu-button'));
        });
        expect(wrapper.getByTestId('close-menu-button')).toBeTruthy();
        act(() => {
            fireEvent.click(wrapper.getByTestId('close-menu-button'));
        });
    });
});
