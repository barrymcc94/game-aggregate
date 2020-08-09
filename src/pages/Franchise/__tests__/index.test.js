import React from 'react';
import Franchise from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<Franchise/>', () => {
    it('runs a snapshot test', () => {
        expect(
            mountWithBaseWrapper(<Franchise match={{params: {guid: 'test'}}} />)
        ).toMatchSnapshot();
    });
});
