import React from 'react';
import userEvent from '@testing-library/user-event';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {MediaList} from '../index';
import {waitFor} from '@testing-library/react';

describe('<MediaList/>', () => {
    it('tests loader appears when fetching with existing data', () => {
        const wrapper = renderWithBaseWrapper(
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
        expect(wrapper.getAllByTestId('media-li-grid-loader').length).toEqual(
            12
        );
        expect(wrapper.getAllByText('name').length).toEqual(1);
    });

    it('tests Medialist renders as expected with media data', () => {
        const wrapper = renderWithBaseWrapper(
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
        expect(wrapper.queryAllByTestId('media-li-grid-loader').length).toEqual(
            0
        );
        expect(wrapper.getAllByText('name').length).toEqual(1);
        expect(wrapper.queryAllByTestId('carousel').length).toEqual(0);
    });

    it('tests Medialist renders a carousel as expected', () => {
        const wrapper = renderWithBaseWrapper(
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
        expect(wrapper.queryAllByTestId('media-ui-grid').length).toEqual(0);
        expect(wrapper.getAllByTestId('carousel').length).toEqual(1);
        expect(wrapper.getAllByText('name').length).toEqual(1);
    });

    it('tests Medialist renders with temp message when no results are presented', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={false}
                items={[]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.queryAllByTestId('media-ui-grid').length).toEqual(0);
        expect(wrapper.queryByTestId('error-message')).toBeFalsy();
        expect(wrapper.getAllByText('temp message').length).toEqual(1);
    });

    it('tests Medialist renders with temp message when error is true', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaList
                title="test"
                isLoading={false}
                error={true}
                items={[]}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.getAllByText('temp message').length).toEqual(2);
    });

    it('tests Component with load more button', async () => {
        const loadMore = jest.fn();
        const wrapper = await renderWithBaseWrapper(
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
        const loadMoreBtn = wrapper.getByTestId('load-more-btn');

        userEvent.click(loadMoreBtn);
        await waitFor(() => {
            expect(loadMore).toBeCalledTimes(1);
        });
    });

    it('tests Component with load more link', async () => {
        const loadMore = jest.fn();
        const wrapper = await renderWithBaseWrapper(
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

        const loadMoreBtn = wrapper.getByTestId('load-more-btn');

        userEvent.click(loadMoreBtn);
        await waitFor(() => {
            expect(loadMore).toBeCalledTimes(0);
        });
    });
});
