import React from 'react';
import DocumentTitle from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<DocumentTitle/>', () => {
    it('verifies document title changes as expected', async () => {
        const wrapper = renderWithBaseWrapper(
            <DocumentTitle title={'test title'}>test</DocumentTitle>
        );
        expect(document.title).toEqual('test title');
        expect(wrapper.getByText('test')).toBeTruthy();

        renderWithBaseWrapper(<DocumentTitle />);
        expect(document.title).toEqual('test title');
    });
});
