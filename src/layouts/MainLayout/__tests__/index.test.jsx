import React from "react";
import {mountWithBaseWrapper} from '../../../../tests/helper';
import MainLayout from "../index";
import {StyledMain} from '../styles.js';
jest.mock('@material-ui/core/Zoom', () => ({children}) => <div>{children}</div>);

describe('<MainLayout/>', () => {
    it('correctly renders MainLayout', () => {
        const component = <MainLayout>test content</MainLayout>;
        const wrapper = mountWithBaseWrapper(component);
        wrapper.setProps({location: {pathname: '/test'}});
        expect(wrapper.find(StyledMain).text()).toEqual('test content');
    });
});