import React from 'react';
import AuthModal from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {ProgressSpinner} from '../styles.js';

describe('<AuthModal/>', () => {
    const toggleModal = jest.fn();
    const onAppCodeChange = jest.fn();
    const submitForm = jest.fn();

    it('renders standard as expected', () => {
        const wrapper = mountWithBaseWrapper(
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
        expect(wrapper.text()).toEqual(
            'AuthenticationAuth key required, you can get one at GiantbombEnter App CodeEnter App CodeSubmitCloseLogin'
        );
        expect(wrapper.find(ProgressSpinner).length).toEqual(0);
    });

    it('renders error state as expected', () => {
        const wrapper = mountWithBaseWrapper(
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
        expect(wrapper.text()).toContain('Please Try Again');
        expect(wrapper.find(ProgressSpinner).length).toEqual(0);
    });

    it('renders success state as expected', () => {
        const wrapper = mountWithBaseWrapper(
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
        expect(wrapper.text()).toContain(
            'Success, you can now use this website'
        );
        expect(wrapper.find(ProgressSpinner).length).toEqual(0);
    });

    it('renders loading state as expected', () => {
        const wrapper = mountWithBaseWrapper(
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
        expect(wrapper.find(ProgressSpinner).length).toEqual(1);
    });
});
