import React from "react";
import {shallow} from 'enzyme';
import {SearchPage} from '../index'

describe('<SearchPage/>', () => {
    it('runs a snapshot test', () => {
        const wrapper = shallow(<SearchPage intl={{formatMessage: () => ''}}/>);
        expect(wrapper).toMatchSnapshot();
    });
});