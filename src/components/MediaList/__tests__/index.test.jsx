import React from 'react';
import {MediaList} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledButton} from '../LoadMoreButton/styles';
import {StyledSkeletonLoader} from '../../SkeletonLoader/styles';
import Grid from '@material-ui/core/Grid';
import {StyledErrorMessage} from '../../ErrorMessage/styles';

describe('<MediaList/>', () => {
    it('tests loader appears when fetching', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                titleId="test"
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
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(Grid)).toBe(true);
    });

    it('tests Medialist renders as expected with media data', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                titleId="test"
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
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
    });

    it('tests Medialist renders with error message when no results are presented', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                titleId="test"
                isLoading={false}
                error={false}
                items={[]}
            />
        );
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
        expect(wrapper.find(StyledErrorMessage).length).toEqual(1);
    });

    it('tests Medialist renders with error message when error is true', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaList
                titleId="test"
                isLoading={false}
                error={true}
                items={[]}
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
                titleId="test"
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
                {...{
                    buttonType: '',
                    loadMoreId: 'homePage.gamesLink',
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
                titleId="test"
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
                {...{
                    buttonType: 'link',
                    loadMoreId: 'homePage.gamesLink',
                    loadMore,
                }}
            />
        );

        wrapper.find(StyledButton).simulate('click');
        expect(loadMore).toBeCalledTimes(0);
    });
});
