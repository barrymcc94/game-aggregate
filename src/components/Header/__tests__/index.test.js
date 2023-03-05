import React from 'react';
import userEvent from '@testing-library/user-event';
import {screen, waitFor} from '@testing-library/react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {Header} from '../index';
/*eslint-disable */
jest.mock('@mui/material/Zoom', () => ({children}) => <div>{children}</div>);
/*eslint-enable */

describe('<Header/>', () => {
    it('opens and closes side menu through open & close button click', async () => {
        renderWithBaseWrapper(<Header intl={{formatMessage: jest.fn()}} />);
        const openButton = screen.getByTestId('open-menu-button');
        expect(openButton).toHaveAttribute('aria-expanded', 'false');
        userEvent.click(openButton);

        const closeButton = await screen.findByTestId('close-menu-button');
        await waitFor(() => {
            expect(closeButton).toHaveAttribute('aria-expanded', 'true');
        });

        userEvent.click(closeButton);
        await waitFor(() => {
            expect(closeButton).toHaveAttribute('aria-expanded', 'false');
        });

        await waitFor(() => {
            expect(closeButton).toHaveAttribute('aria-expanded', 'false');
        });

        await waitFor(async () => {
            expect(
                await screen.findByTestId('open-menu-button')
            ).toHaveAttribute('aria-expanded', 'false');
        });
    });
});
