import React from 'react';
import {MediaList} from '../index';
import {StyledCarouselWrapper} from '../../MediaCarousel/styles';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledButton} from '../LoadMoreButton/styles';
import {StyledSkeletonLoader} from '../../SkeletonLoader/styles';
import Grid from '@material-ui/core/Grid';
import {StyledErrorMessage} from '../../ErrorMessage/styles';

describe('<MediaList/>', () => {
    it('tests loader appears when fetching', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={true}
                error={false}
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: Date.now(),
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(Grid)).toBe(true);
    });

    it('tests Medialist renders as expected with media data', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={false}
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: Date.now(),
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
    });

    it('tests Medialist renders a carousel as expected', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                isCarousel={true}
                title="test"
                isLoading={false}
                error={false}
                total={10}
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: Date.now(),
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledCarouselWrapper)).toBe(true);
    });

    it('tests Medialist renders with temp message when no results are presented', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={false}
                items={[]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
    });

    it('tests Medialist renders with temp message when error is true', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={true}
                items={[]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
        expect(wrapper.find(StyledErrorMessage).length).toEqual(1);
    });

    it('tests Component with load more button', async () => {
        const loadMore = jest.fn(() => {});
        const wrapper = await mountWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={false}
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: Date.now(),
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
                intl={{formatMessage: () => 'temp message'}}
                {...{
                    buttonType: '',
                    loadMoreText: 'load more',
                    loadMore,
                }}
            />
        );

        wrapper.find(StyledButton).simulate('click');
        expect(loadMore).toBeCalledTimes(1);
    });

    it('tests Component with load more link', async () => {
        const loadMore = jest.fn(() => {});
        const wrapper = await mountWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={false}
                link="/"
                items={[
                    {
                        id: 1,
                        name: 'name',
                        deck: 'deck',
                        original_release_date: Date.now(),
                        image: {
                            screen_url: 'test',
                        },
                    },
                ]}
                intl={{formatMessage: () => 'temp message'}}
                {...{
                    buttonType: 'link',
                    loadMoreText: 'load more',
                    loadMore,
                }}
            />
        );

        wrapper.find(StyledButton).simulate('click');
        expect(loadMore).toBeCalledTimes(0);
    });
});
