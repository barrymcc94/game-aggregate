import React from "react";
import Company from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';


describe('<Company/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Company match={{params: {guid: 'test'}}}/>)).toMatchSnapshot();
    });
});