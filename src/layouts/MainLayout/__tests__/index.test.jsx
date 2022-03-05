import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import MainLayout from '../index';
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
});
