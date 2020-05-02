import React from "react";
import {Header} from "../index";
import {StyledNav, StyledIconButton, MenuIcon, CloseIcon} from '../styles';
import {shallow} from 'enzyme';
import {testRenderer, mountWithBaseWrapper} from '../../../../tests/helper';
jest.mock('@material-ui/core/Zoom', () => ({children}) => <div>{children}</div>);

describe('<Header/>', () => {
    it('renders correctly', () => {
        const component = <Header intl={{formatMessage: jest.fn()}} />;
        expect(testRenderer(component).toJSON()).toMatchSnapshot();
    });

    it('simulates toggleMenu call through hamburger click', () => {
        const wrapper = mountWithBaseWrapper(<Header intl={{formatMessage: jest.fn()}} />);
        global.innerWidth = 400;
        global.dispatchEvent(new Event('resize'));
        expect(wrapper.find(MenuIcon).length).toEqual(1);
        expect(wrapper.find(CloseIcon).length).toEqual(0);
        wrapper.find(StyledIconButton).simulate('click');
        expect(wrapper.find(MenuIcon).length).toEqual(0);
        expect(wrapper.find(CloseIcon).length).toEqual(1);
    });

    it('simulates closeMenu call through link click', () => {
        const wrapper = shallow(<Header intl={{formatMessage: jest.fn()}} />);
        wrapper.find(StyledIconButton).simulate('click');
        expect(wrapper.find(MenuIcon).length).toEqual(0);
        expect(wrapper.find(CloseIcon).length).toEqual(1);
        wrapper.find(StyledNav).simulate('click');
        expect(wrapper.find(MenuIcon).length).toEqual(1);
        expect(wrapper.find(CloseIcon).length).toEqual(0);
    });
});