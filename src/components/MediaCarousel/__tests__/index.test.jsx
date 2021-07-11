import React from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import {act, fireEvent} from '@testing-library/react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import MediaCarousel, {calculatePrevPos, calculateNextPos} from '../index';

jest.mock('lodash.throttle');
jest.mock('lodash.debounce');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);
debounce.mockImplementation((fn) => fn);

Element.prototype.scrollTo = jest.fn();

describe('<MediaCarousel/> functions', () => {
    it('tests calculatePrevPos', () => {
        expect(calculatePrevPos(600, 300)).toEqual(300);
        expect(calculatePrevPos(0, 300)).toEqual(0);
    });
    it('tests calculateNextPos', () => {
        expect(calculateNextPos(600, 300, 5)).toEqual(900);
        expect(calculateNextPos(1500, 300, 5)).toEqual(1500);
    });
});

describe('<MediaCarousel/>', () => {
    const items = [
        {image: {screen_url: 'test'}},
        {image: {screen_url: 'test'}},
        {image: {screen_url: 'test'}},
        {image: {screen_url: 'test'}},
    ];
    it('tests carousel renders', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaCarousel
                items={items}
                total={5}
                link={'/'}
                loadMore={jest.fn()}
            />
        );
        expect(wrapper.getAllByTestId('carousel-column').length).toEqual(5);
        wrapper.unmount();
    });

    it('tests prev and next buttons work as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaCarousel
                items={items}
                total={5}
                link={'/'}
                loadMore={jest.fn()}
            />
        );
        act(() => {
            fireEvent.click(wrapper.getByTestId('prev-btn'));
            fireEvent.click(wrapper.getByTestId('next-btn'));
        });
        expect(Element.prototype.scrollTo).toBeCalledTimes(1);
    });

    it('tests scrolling', () => {
        const loadMore = jest.fn();
        const wrapper = renderWithBaseWrapper(
            <MediaCarousel
                items={items}
                total={5}
                error={false}
                link={'/'}
                isLoading={false}
                loadMore={loadMore}
            />
        );

        act(() => {
            fireEvent.scroll(wrapper.getByTestId('carousel').children[2], {
                target: {scrollX: 100},
            });
        });
        expect(loadMore).toBeCalledTimes(1);
    });
});
