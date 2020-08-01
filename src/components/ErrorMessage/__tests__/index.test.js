import React from "react";
import ErrorMessage, {isEqual} from "../index";
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<ErrorMessage/>', () => {
    it('renders when error prop is true', () => {
        const wrapper = mountWithBaseWrapper(<ErrorMessage id="errorPage.errorMessage" error={true}/>);
        expect(wrapper.children().length).toEqual(1);
        expect(wrapper.text()).toEqual("Error Occurred");
        expect(wrapper).toMatchSnapshot();
    });

    it('does not render when error prop is false', () => {
        const wrapper = mountWithBaseWrapper(<ErrorMessage id="errorPage.errorMessage" error={false}/>);
        expect(wrapper.html()).toEqual('');
        expect(wrapper).toMatchSnapshot();
    });

    it('does not render when id prop is falsy', () => {
        const wrapper = mountWithBaseWrapper(<ErrorMessage id="" error={true}/>);
        expect(wrapper.html()).toEqual('');
        expect(wrapper).toMatchSnapshot();
    });

    it('tests isEqual function', () => {
        expect(isEqual({error: true}, {error: true})).toEqual(true);
        expect(isEqual({error: true}, {error: false})).toEqual(false);
    });
});