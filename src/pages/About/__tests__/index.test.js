import React from "react";
import {mountWithBaseWrapper} from '../../../../tests/helper';
import About from '../index'

describe('<About/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<About/>)).toMatchSnapshot();
    });
});