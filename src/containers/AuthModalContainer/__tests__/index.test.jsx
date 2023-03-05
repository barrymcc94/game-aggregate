import React from 'react';
import userEvent from '@testing-library/user-event';
import {screen, waitFor} from '@testing-library/react';
import Container, {AuthModalContainer} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('<AuthModalContainer/>', () => {
    const defaultStoreProps = {
        giantbomb: {
            api_key: null,
            isFetching: false,
            error: false,
        },
    };
    it('tests input flow of container', async () => {
        const store = mockStore({auth: defaultStoreProps});
        const wrapper = renderWithBaseWrapper(<Container />, store);
        const input =
            wrapper.getByTestId('auth-code-input').children[1].firstChild;
        const submitBtn = wrapper.getByTestId('auth-code-submit');

        await userEvent.type(input, 'test_appcode');
        userEvent.click(submitBtn);

        await waitFor(() => {
            expect(store.getActions().length).toEqual(1);
        });

        expect(store.getActions()[0].type).toEqual('FETCH_GB_API_KEY_STARTED');
    });

    it('tests input flow of container when fetching', () => {
        const store = mockStore({
            auth: {
                ...defaultStoreProps,
                giantbomb: {
                    ...defaultStoreProps.giantbomb,
                    isFetching: true,
                },
            },
        });
        const wrapper = renderWithBaseWrapper(<Container />, store);
        const submitBtn = wrapper.getByTestId('auth-code-submit');

        expect(submitBtn).toBeDisabled();
    });

    it('tests error flow of container', () => {
        const store = mockStore({
            auth: {
                ...defaultStoreProps,
                giantbomb: {
                    ...defaultStoreProps.giantbomb,
                    error: true,
                },
            },
        });
        const wrapper = renderWithBaseWrapper(<Container />, store);
        const input =
            wrapper.getByTestId('auth-code-input').children[1].firstChild;
        userEvent.type(input, 'test_appcode');
    });

    it('tests opening modal does not trigger route refresh', async () => {
        renderWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={'test'}
                fetchGBApiKey={jest.fn()}
            />
        );
        const modalBtn = screen.getByTestId('modal-btn');
        userEvent.click(modalBtn);

        const closeBtn = await screen.findByTestId('auth-code-close');
        userEvent.click(closeBtn);

        expect(mockedUsedNavigate).toBeCalledTimes(0);
    });

    it('tests closing modal triggers route refresh', async () => {
        const {rerender} = renderWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={null}
                fetchGBApiKey={jest.fn()}
            />
        );

        rerender(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={'test'}
                fetchGBApiKey={jest.fn()}
            />
        );
        const closeBtn = screen.getByTestId('auth-code-close');
        userEvent.click(closeBtn);

        await waitFor(() => {
            expect(mockedUsedNavigate).toBeCalledTimes(2);
        });

        expect(mockedUsedNavigate).toBeCalledWith('/empty');
        expect(mockedUsedNavigate).toBeCalledWith(-1);
    });

    it('tests error correctly is displayed when component is passed one', async () => {
        const {rerender} = renderWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={true}
                api_key={null}
                fetchGBApiKey={jest.fn()}
            />
        );

        const input =
            screen.getByTestId('auth-code-input').children[1].firstChild;
        await userEvent.type(input, 'test_appcode');

        rerender(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={null}
                fetchGBApiKey={jest.fn()}
            />
        );

        await waitFor(() => {
            expect(
                screen.queryByText('An Error Occurred, Please Try Again')
            ).toBeNull();
        });
    });
});
