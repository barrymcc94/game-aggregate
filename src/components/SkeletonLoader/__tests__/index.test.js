import React from 'react';
import {SkeletonLoader} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<SkeletonLoader/>', () => {
    it('tests SkeletonLoader displays text loader correctly ', () => {
        const wrapper = mountWithBaseWrapper(
            <SkeletonLoader
                variant="text"
                numLines={2}
                intl={{formatMessage: jest.fn()}}
            />
        );
        expect(wrapper.find('span').length).toEqual(1);
        expect(wrapper.find('br').length).toEqual(2);
    });

    it('tests SkeletonLoader displays rect loader correctly ', () => {
        const wrapper = mountWithBaseWrapper(
            <SkeletonLoader variant="rect" intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper.find('span').length).toEqual(1);
        expect(wrapper.find('br').length).toEqual(0);
    });
});
