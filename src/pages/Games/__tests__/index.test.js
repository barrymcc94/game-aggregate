import React from "react";
import {shallow} from 'enzyme';
import {GamesPage, submitForm} from '../index'

describe('<GamesPage/>', () => {

    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('runs a snapshot test', () => {
        const wrapper = shallow(<GamesPage intl={{formatMessage: () => ''}}/>);
        expect(wrapper).toMatchSnapshot();
    });
});