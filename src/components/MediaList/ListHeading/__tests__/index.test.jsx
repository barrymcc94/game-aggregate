import React from 'react';
import {ListHeading} from '../index';
import {mountWithBaseWrapper} from '../../../../../tests/helper';
import {StyledSkeletonLoader} from '../../../SkeletonLoader/styles';

describe('<ListHeading/>', () => {
    it('tests Component renders as expected', () => {
        const wrapper = mountWithBaseWrapper(
            <ListHeading
                titleId="homePage.gamesHeading"
                isLoading={false}
                displayTitle={true}
            />
        );

        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(false);
        expect(wrapper.text()).toEqual('New and upcoming games');
    });

    it('tests Component renders null displayTitle is false', () => {
        const wrapper = mountWithBaseWrapper(
            <ListHeading titleId="id" isLoading={false} displayTitle={false} />
        );

        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(false);
        expect(wrapper.html()).toEqual(null);
    });

    it('tests Component renders skeleton loader when loading', () => {
        const wrapper = mountWithBaseWrapper(
            <ListHeading titleId="id" isLoading={true} displayTitle={true} />
        );

        expect(wrapper.find(StyledSkeletonLoader).exists()).toEqual(true);
    });
});
