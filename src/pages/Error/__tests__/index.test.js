import React from "react";
import Error from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';


describe('<Error/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Error/>)).toMatchSnapshot();
    });
});