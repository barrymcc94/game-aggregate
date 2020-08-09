import React from 'react';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import Error from '../index';

describe('<Error/>', () => {
    it('runs a snapshot test', () => {
        expect(mountWithBaseWrapper(<Error />)).toMatchSnapshot();
    });
});
