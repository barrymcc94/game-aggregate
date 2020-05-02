import React from "react";
import ErrorMessage from "../index";
import {mountWithBaseWrapper, testRenderer} from '../../../../tests/helper';

describe('<ErrorMessage/>', () => {
    it('renders when error prop is true', () => {
        const component = <ErrorMessage id="errorPage.errorMessage" error={true}/>;
        const wrapper = mountWithBaseWrapper(component);
        expect(wrapper.children().length).toEqual(1);
        expect(wrapper.text()).toEqual("Error Occurred");
        expect(testRenderer(component).toJSON()).toMatchSnapshot();
    });

    it('does not render when error prop is false', () => {
        const component = <ErrorMessage id="errorPage.errorMessage" error={false}/>;
        const wrapper = mountWithBaseWrapper(component);
        expect(wrapper.children().length).toEqual(0);
        expect(testRenderer(component).toJSON()).toMatchSnapshot();
    });

    it('does not render when id prop is falsy', () => {
        const component = <ErrorMessage id="" error={true}/>;
        const wrapper = mountWithBaseWrapper(component);
        expect(wrapper.children().length).toEqual(0);
        expect(testRenderer(component).toJSON()).toMatchSnapshot();
    });
});