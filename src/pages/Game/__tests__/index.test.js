import React from "react";
import Game from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';


describe('<Game/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Game match={{params: {guid: 'test'}}}/>)).toMatchSnapshot();
    });
});