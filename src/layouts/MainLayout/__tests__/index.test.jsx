import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import MainLayout, {isEqual} from '../index';
/*eslint-disable */
jest.mock('@material-ui/core/Zoom', () => ({children}) => (
    <div>{children}</div>
));
/*eslint-enable */

describe('<MainLayout/>', () => {
    it('correctly renders MainLayout', () => {
        const component = <MainLayout>test content</MainLayout>;
        const wrapper = renderWithBaseWrapper(component);
        expect(wrapper.getByText('test content')).toBeTruthy();
    });
    it('tests isEqual function', () => {
        expect(
            isEqual(
                {location: {pathname: 'test'}},
                {location: {pathname: 'test'}}
            )
        ).toEqual(true);
        expect(
            isEqual(
                {location: {pathname: 'test1'}},
                {location: {pathname: 'test2'}}
            )
        ).toEqual(false);
    });
});
