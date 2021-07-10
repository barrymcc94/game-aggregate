import React from 'react';
import AuthModal from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<AuthModal/>', () => {
    const toggleModal = jest.fn();
    const onAppCodeChange = jest.fn();
    const submitForm = jest.fn();

    it('renders standard as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <AuthModal
                appCode=""
                isFetching={false}
                error={false}
                api_key=""
                modalActive={true}
                intl={{formatMessage: () => ''}}
                {...{toggleModal, onAppCodeChange, submitForm}}
            />
        );
        expect(wrapper.queryByTestId('progress-spinner')).toBeFalsy();
    });

    it('renders error state as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <AuthModal
                appCode=""
                isFetching={false}
                error={true}
                api_key=""
                modalActive={true}
                intl={{formatMessage: () => ''}}
                {...{toggleModal, onAppCodeChange, submitForm}}
            />
        );
        expect(
            wrapper.getByText('An Error Occurred, Please Try Again')
        ).toBeTruthy();
        expect(wrapper.queryByTestId('progress-spinner')).toBeFalsy();
    });

    it('renders success state as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <AuthModal
                appCode=""
                isFetching={false}
                error={false}
                api_key="test"
                modalActive={true}
                intl={{formatMessage: () => ''}}
                {...{toggleModal, onAppCodeChange, submitForm}}
            />
        );
        expect(wrapper.queryByTestId('progress-spinner')).toBeFalsy();
        expect(
            wrapper.getByText('Success, you can now use this website')
        ).toBeTruthy();
    });

    it('renders loading state as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <AuthModal
                appCode=""
                isFetching={true}
                error={false}
                api_key=""
                modalActive={true}
                intl={{formatMessage: () => ''}}
                {...{toggleModal, onAppCodeChange, submitForm}}
            />
        );
        expect(wrapper.getByTestId('progress-spinner')).toBeTruthy();
    });
});
