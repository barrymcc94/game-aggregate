import React from 'react';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import Home from '../index';

describe('<Home/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Home />)).toMatchSnapshot();
    });
});
