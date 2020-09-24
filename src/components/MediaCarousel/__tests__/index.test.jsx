import React from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {PrevButton, NextButton} from '../styles';
import MediaCarousel, {
    getBtnStyle,
    calculatePrevPos,
    calculateNextPos,
} from '../index';

jest.mock('lodash.throttle');
jest.mock('lodash.debounce');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);
debounce.mockImplementation((fn) => fn);

Element.prototype.scrollTo = jest.fn();

describe('<MediaCarousel/> functions', () => {
    it('tests getBtnStyle', () => {
        expect(getBtnStyle(true)).toEqual({});
        expect(getBtnStyle(false)).toEqual({
            display: 'none',
            visibility: 'hidden',
        });
    });
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
    it('tests carousel renders', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaCarousel
                items={[{}, {}, {}, {}]}
                total={5}
                width={1000}
                link={'/'}
                loadMore={jest.fn()}
            />
        );
        expect(wrapper.find('li').length).toEqual(5);
        wrapper.unmount();
    });

    it('tests prev and next buttons work as expected', () => {
        const wrapper = mountWithBaseWrapper(
            <MediaCarousel
                items={[{}, {}, {}, {}]}
                total={5}
                width={1000}
                link={'/'}
                loadMore={jest.fn()}
            />
        );
        wrapper.find(NextButton).simulate('click');
        wrapper.find(PrevButton).simulate('click'); // prev will not be called from 0
        expect(Element.prototype.scrollTo).toBeCalledTimes(1);
    });

    it('tests scrolling', () => {
        const loadMore = jest.fn();
        const wrapper = mountWithBaseWrapper(
            <MediaCarousel
                items={[{}, {}, {}, {}]}
                total={5}
                error={false}
                width={1000}
                link={'/'}
                isLoading={false}
                loadMore={loadMore}
            />
        );

        wrapper
            .find('div')
            .at(0)
            .getDOMNode()
            .dispatchEvent(new Event('scroll'));

        expect(loadMore).toBeCalledTimes(1);
    });
});
