import React from "react";
import Loader from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';


describe('<Loader/>', () => {
    it('run a snapshot test', () => {
        expect(mountWithBaseWrapper(<Loader isLoading={true}/>)).toMatchSnapshot();
    });

    it('to return null when not loading and no children supplied', () => {
        expect(mountWithBaseWrapper(<Loader isLoading={false}/>).children().length).toEqual(0);
    });

    it('to return children when not loading', () => {
        expect(mountWithBaseWrapper(<Loader isLoading={false}>test</Loader>).text()).toEqual('test')
    });
});