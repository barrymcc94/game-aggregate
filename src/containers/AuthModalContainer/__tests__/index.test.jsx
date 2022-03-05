import React from 'react';
import {screen, act, fireEvent} from '@testing-library/react';
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
    it('tests input flow of container', () => {
        const store = mockStore({auth: defaultStoreProps});
        const wrapper = renderWithBaseWrapper(<Container />, store);
        const input =
            wrapper.getByTestId('auth-code-input').children[1].firstChild;
        const submitBtn = wrapper.getByTestId('auth-code-submit');
        act(() => {
            fireEvent.change(input, {target: {value: 'test_appcode'}});
        });
        act(() => {
            fireEvent.click(submitBtn);
        });

        expect(store.getActions().length).toEqual(1);
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
        const input =
            wrapper.getByTestId('auth-code-input').children[1].firstChild;
        const submitBtn = wrapper.getByTestId('auth-code-submit');
        act(() => {
            fireEvent.change(input, {target: {value: 'test_appcode'}});
        });
        act(() => {
            fireEvent.click(submitBtn);
        });
        expect(store.getActions().length).toEqual(0);
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
        act(() => {
            fireEvent.change(input, {target: {value: 'test_appcode'}});
        });
    });

    it('tests opeing modal does not trigger route refresh', () => {
        const wrapper = renderWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={'test'}
                fetchGBApiKey={jest.fn()}
            />
        );
        const modalBtn = wrapper.getByTestId('modal-btn');
        act(() => {
            fireEvent.click(modalBtn);
        });
        const closeBtn = wrapper.getByTestId('auth-code-close');
        act(() => {
            fireEvent.click(closeBtn);
        });
        expect(mockedUsedNavigate).toBeCalledTimes(0);
        expect(mockedUsedNavigate).toBeCalledTimes(0);
    });

    it('tests closing modal triggers route refresh', () => {
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
        act(() => {
            fireEvent.click(closeBtn);
        });
        expect(mockedUsedNavigate).toBeCalledTimes(2);
        expect(mockedUsedNavigate).toBeCalledWith('/empty');
        expect(mockedUsedNavigate).toBeCalledWith(-1);
    });
});
