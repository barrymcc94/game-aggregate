import React from "react";
import Companies, {submitForm} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<Companies/>', () => {
    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Companies match={{params: {guid: 'test'}}}/>)).toMatchSnapshot();
    });
});