import React from 'react';
import throttle from 'lodash.throttle';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {PrevButton, NextButton} from '../styles';
import MediaCarousel from '../index';

jest.mock('lodash.throttle');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);

Element.prototype.scrollTo = jest.fn();

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
        wrapper.find(NextButton).simulate('click');
        wrapper.find(PrevButton).simulate('click');
        wrapper.find(PrevButton).simulate('click');

        expect(Element.prototype.scrollTo).toBeCalledTimes(2);
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
