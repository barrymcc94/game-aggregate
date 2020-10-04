import React from 'react';
import Container, {AuthModalContainer} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
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
        const wrapper = mountWithBaseWrapper(<Container />, store);
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'test_appcode'}});
        const submitBtn = wrapper.find('button').first();
        submitBtn.simulate('click');
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
        const wrapper = mountWithBaseWrapper(<Container />, store);
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'test_appcode'}});
        const submitBtn = wrapper.find('button').first();
        submitBtn.simulate('click');
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
        const wrapper = mountWithBaseWrapper(<Container />, store);
        const input = wrapper.find('input').first();
        input.simulate('change', {target: {value: 'test_appcode'}});
    });

    it('tests closing modal triggers route refresh', () => {
        const history = {
            push: jest.fn(),
            goBack: jest.fn(),
        };
        const wrapper = mountWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={null}
                fetchGBApiKey={jest.fn()}
                history={history}
            />
        );
        expect(wrapper.find('button').length).toEqual(3);
        wrapper.setProps({api_key: 'key'});
        const closeBtn = wrapper.find('button').at(1);
        closeBtn.simulate('click');
        expect(history.push).toBeCalledTimes(1);
        expect(history.push).toBeCalledWith('/empty');
        expect(history.goBack).toBeCalledTimes(1);
    });

    it('tests opeing modal does not trigger route refresh', () => {
        const history = {
            push: jest.fn(),
            goBack: jest.fn(),
        };
        const wrapper = mountWithBaseWrapper(
            <AuthModalContainer
                isFetching={false}
                error={false}
                api_key={'test'}
                fetchGBApiKey={jest.fn()}
                history={history}
            />
        );
        expect(wrapper.find('button').length).toEqual(1);
        const loginBtn = wrapper.find('button').at(0);
        loginBtn.simulate('click');
        expect(history.push).toBeCalledTimes(0);
        expect(history.goBack).toBeCalledTimes(0);
    });
});
