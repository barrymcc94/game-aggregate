import React from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import InfiniteLoader from '../index';

jest.mock('lodash.throttle');
jest.mock('lodash.debounce');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);
debounce.mockImplementation((fn) => fn);

describe('<InfiniteLoader/>', () => {
    const loadMore = jest.fn();
    beforeEach(() => {
        loadMore.mockClear();
    });

    it('tests scrolling loads more when over 80% down page', () => {
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

    it('tests scrolling does not load more when less than 80% down page', () => {
        const listRef = {current: {offsetHeight: 0, offsetTop: 0}};
        const wrapper = renderWithBaseWrapper(
            <InfiniteLoader loadMore={loadMore} listRef={listRef}>
                test
            </InfiniteLoader>
        );
        global.innerHeight = 0;
        global.pageYOffset = -1;
        global.dispatchEvent(new Event('scroll'));
        wrapper.unmount();
        expect(loadMore).toHaveBeenCalledTimes(0);
    });
});
