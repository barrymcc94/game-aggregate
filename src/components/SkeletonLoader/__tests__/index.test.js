import React from 'react';
import {SkeletonLoader} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<SkeletonLoader/>', () => {
    it('tests SkeletonLoader displays text loader correctly ', () => {
        const wrapper = renderWithBaseWrapper(
            <SkeletonLoader
                variant="text"
                numLines={2}
                intl={{formatMessage: jest.fn()}}
            />
        );
        expect(wrapper.getAllByTestId('loader').length).toEqual(1);
        expect(wrapper.getAllByTestId('loader-br').length).toEqual(2);
    });

    it('tests SkeletonLoader displays rect loader correctly ', () => {
        const wrapper = renderWithBaseWrapper(
            <SkeletonLoader variant="rect" intl={{formatMessage: jest.fn()}} />
        );
        expect(wrapper.getAllByTestId('loader').length).toEqual(1);
        expect(wrapper.queryAllByTestId('loader-br').length).toEqual(0);
    });
});
