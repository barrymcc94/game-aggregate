import React from 'react';
import DocumentTitle from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<DocumentTitle/>', () => {
    it('verifies document title changes as expected', async () => {
        const wrapper = await mountWithBaseWrapper(
            <DocumentTitle title={'test title'}>test</DocumentTitle>
        );
        expect(document.title).toEqual('test title');
        expect(wrapper.text()).toEqual('test');

        const wrapper2 = await mountWithBaseWrapper(<DocumentTitle />);
        expect(document.title).toEqual('test title');
        expect(wrapper2.text()).toEqual('');
    });
});
