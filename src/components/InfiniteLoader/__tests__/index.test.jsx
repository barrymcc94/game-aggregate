import React from 'react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import InfiniteLoader from '../index';

jest.useFakeTimers();

jest.mock('../../../utils', () => ({
    ...jest.requireActual('../../../utils'),
    throttle: (fn) => fn,
    debounce: (fn) => fn,
}));

describe('<InfiniteLoader/>', () => {
    const loadMore = jest.fn();
    beforeEach(() => {
        loadMore.mockClear();
    });

    it('tests scrolling loads more when within 500px from bottom of component', () => {
        const listRef = {current: {offsetHeight: 0, offsetTop: 0}};
        renderWithBaseWrapper(
            <InfiniteLoader loadMore={loadMore} listRef={listRef}>
                test
            </InfiniteLoader>
        );
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(loadMore).toHaveBeenCalledTimes(1);
    });

    it('tests scrolling does not load more when over 500px from bottom of component', () => {
        const listRef = {current: {offsetHeight: 0, offsetTop: 0}};
        const wrapper = renderWithBaseWrapper(
            <InfiniteLoader loadMore={loadMore} listRef={listRef}>
                test
            </InfiniteLoader>
        );
        global.innerHeight = 0;
        global.pageYOffset = -501;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(loadMore).toHaveBeenCalledTimes(0);
    });
});
