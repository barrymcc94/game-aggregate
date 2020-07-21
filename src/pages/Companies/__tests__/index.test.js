import React from "react";
import Companies from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<Companies/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Companies match={{params: {guid: 'test'}}}/>)).toMatchSnapshot();
    });
});