import React from 'react';
import {act} from 'react-dom/test-utils';
import {Header} from '../index';
import {CloseIcon, MenuIcon, StyledIconButton} from '../styles';
import {mountWithBaseWrapper} from '../../../../tests/helper';
/*eslint-disable */
jest.mock('@material-ui/core/Zoom', () => ({children}) => (
    <div>{children}</div>
));
/*eslint-enable */

describe('<Header/>', () => {
    it('renders correctly', () => {
        const wrapper = mountWithBaseWrapper(
            <Header intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('opens and closes side menu through open & close button click', () => {
        const wrapper = mountWithBaseWrapper(
            <Header intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper.find(StyledIconButton).length).toEqual(1);
        act(() => {
            wrapper.find(MenuIcon).at(0).simulate('click');
        });
        wrapper.update();
        expect(wrapper.find(StyledIconButton).length).toEqual(2);
        act(() => {
            wrapper.find(CloseIcon).at(0).simulate('click');
        });
    });
});
