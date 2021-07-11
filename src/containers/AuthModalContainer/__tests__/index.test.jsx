import React from 'react';
import {screen, act, fireEvent} from '@testing-library/react';
import Container, {AuthModalContainer} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {mockStore} from '../../../../tests/setup';

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
        const input = wrapper.getByTestId('auth-code-input').children[1]
            .firstChild;
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
        const input = wrapper.getByTestId('auth-code-input').children[1]
            .firstChild;
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
        const input = wrapper.getByTestId('auth-code-input').children[1]
            .firstChild;
        act(() => {
            fireEvent.change(input, {target: {value: 'test_appcode'}});
        });
    });

    it('tests opeing modal does not trigger route refresh', () => {
        const history = {
            push: jest.fn(),
            goBack: jest.fn(),
        };
        const wrapper = renderWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={'test'}
                fetchGBApiKey={jest.fn()}
                history={history}
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
        expect(history.push).toBeCalledTimes(0);
        expect(history.goBack).toBeCalledTimes(0);
    });

    it('tests closing modal triggers route refresh', () => {
        const history = {
            push: jest.fn(),
            goBack: jest.fn(),
        };
        const {rerender} = renderWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={null}
                fetchGBApiKey={jest.fn()}
                history={history}
            />
        );

        rerender(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={'test'}
                fetchGBApiKey={jest.fn()}
                history={history}
            />
        );
        const closeBtn = screen.getByTestId('auth-code-close');
        act(() => {
            fireEvent.click(closeBtn);
        });
        expect(history.push).toBeCalledTimes(1);
        expect(history.push).toBeCalledWith('/empty');
        expect(history.goBack).toBeCalledTimes(1);
    });
});
