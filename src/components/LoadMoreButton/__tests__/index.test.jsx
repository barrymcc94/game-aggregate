import React from 'react';
import {LoadMoreButton} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledButton} from '../../LoadMoreButton/styles';
import {StyledSkeletonLoader} from '../../SkeletonLoader/styles';

describe('<MediaList/>', () => {
    it('tests Component renders null with invalid props', () => {
        const wrapper = mountWithBaseWrapper(
            <LoadMoreButton id="" isLoading={false} />
        );

        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(false);
        expect(wrapper.html()).toEqual(null);
    });

    it('tests Component renders skeleton loader when loading', () => {
        const wrapper = mountWithBaseWrapper(
            <LoadMoreButton id="1" isLoading={true} />
        );
        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(true);
    });

    it('tests Component with load more button', () => {
        const onClick = jest.fn(() => {});
        const wrapper = mountWithBaseWrapper(
            <LoadMoreButton id="id" isLoading={false} onClick={onClick} />
        );
        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(false);
        wrapper.find(StyledButton).simulate('click');
        expect(onClick).toBeCalledTimes(1);
    });

    it('tests Component with load more button', () => {
        const onClick = jest.fn(() => {});
        const wrapper = mountWithBaseWrapper(
            <LoadMoreButton
                id="id"
                isLoading={false}
                link={'/'}
                buttonType="link"
                onClick={onClick}
            />
        );

        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(false);
        wrapper.find(StyledButton).simulate('click');
        expect(onClick).toBeCalledTimes(0);
    });
});
