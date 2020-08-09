import React from 'react';
import {Header} from '../index';
import {StyledNav, MenuIcon} from '../styles';
import {shallow} from 'enzyme';
import {mountWithBaseWrapper} from '../../../../tests/helper';
jest.mock('@material-ui/core/Zoom', () => ({children}) => (
    <div>{children}</div>
));
describe('<Header/>', () => {
    it('renders correctly', () => {
        const wrapper = mountWithBaseWrapper(
            <Header intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const wrapper = mountWithBaseWrapper(
            <Header intl={{formatMessage: jest.fn()}} />
        );
        wrapper.setState({menuActive: true});
    });

    it('simulates toggleMenu call through hamburger click', () => {
        const wrapper = mountWithBaseWrapper(
            <Header intl={{formatMessage: jest.fn()}} />
        );
        global.innerWidth = 400;
        global.dispatchEvent(new Event('resize'));
        expect(wrapper.state('menuActive')).toEqual(false);
        wrapper.find(MenuIcon).simulate('click');
        expect(wrapper.state('menuActive')).toEqual(true);
        wrapper.unmount();
    });

    it('simulates closeMenu call through link click', () => {
        const wrapper = shallow(<Header intl={{formatMessage: jest.fn()}} />);
        wrapper.setState({menuActive: true});
        expect(wrapper.state('menuActive')).toEqual(true);
        wrapper.find(StyledNav).simulate('click');
        wrapper.find(StyledNav).simulate('click');
        expect(wrapper.state('menuActive')).toEqual(false);
    });
});
