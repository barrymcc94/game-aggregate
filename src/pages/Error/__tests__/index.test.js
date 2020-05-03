import React from "react";
import Error from '../index'
import {testRenderer} from '../../../../tests/helper';


describe('<Error/>', () => {
    it('runs a snapshot test', () => {
        expect(testRenderer(<Error/>).toJSON()).toMatchSnapshot();
    });
});