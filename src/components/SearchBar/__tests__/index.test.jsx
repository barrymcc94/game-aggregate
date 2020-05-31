import React from "react";
import SearchBar from '../index'
import {testRenderer} from '../../../../tests/helper';

describe('<SearchBar/>', () => {
    it('run a snapshot test', () => {
        expect(testRenderer(<SearchBar searchLabel="search" value="" onChange={()=>{}}/>).toJSON()).toMatchSnapshot();
    });

});