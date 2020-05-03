import React from "react";
import {shallow} from 'enzyme';
import Home from '../index'

describe('<Home/>', () => {
    it('runs a snapshot test', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper).toMatchSnapshot();
    });
});