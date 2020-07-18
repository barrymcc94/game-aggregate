import React from "react";
import {shallow} from 'enzyme';
import {SearchPage, submitForm} from '../index'

describe('<SearchPage/>', () => {

    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('runs a snapshot test', () => {
        const wrapper = shallow(<SearchPage intl={{formatMessage: () => ''}}/>);
        expect(wrapper).toMatchSnapshot();
    });
});