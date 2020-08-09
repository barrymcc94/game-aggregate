import React from 'react';
import {MediaList} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledSkeletonLoader} from '../../SkeletonLoader/styles';
import Grid from '@material-ui/core/Grid';

describe('<MediaList/>', () => {
    it('tests loader appears when fetching', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                isFetching={true}
                error={false}
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: 'date',
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(Grid)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('tests Medialist renders as expected with media data', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                isFetching={false}
                error={false}
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: 'date',
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});
