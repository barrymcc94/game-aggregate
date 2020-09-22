import React from 'react';
import throttle from 'lodash.throttle';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {PrevButton, NextButton} from '../styles';
import Carousel from '../index';

jest.mock('lodash.throttle');
jest.useFakeTimers();

throttle.mockImplementation((fn) => fn);

Element.prototype.scrollTo = jest.fn();

describe('<Carousel/>', () => {
    it('tests loading carousel', () => {
        const wrapper = mountWithBaseWrapper(
            <Carousel
                items={[]}
                total={5}
                error={false}
                width={1000}
                link={'/'}
                isLoading={true}
                loadMore={jest.fn()}
            />
        );
        expect(wrapper.find('li').length).toEqual(5);
    });

    it('tests carousel with data', () => {
        const wrapper = mountWithBaseWrapper(
            <Carousel
                items={[{}, {}, {}, {}]}
                total={5}
                error={false}
                width={1000}
                link={'/'}
                isLoading={false}
                loadMore={jest.fn()}
            />
        );
        expect(wrapper.find('li').length).toEqual(5);
    });

    it('tests prev and next buttons work as expected', () => {
        const wrapper = mountWithBaseWrapper(
            <Carousel
                items={[{}, {}, {}, {}]}
                total={5}
                error={false}
                width={1000}
                link={'/'}
                isLoading={false}
                loadMore={jest.fn()}
            />
        );

        wrapper.find(NextButton).simulate('click');
        wrapper.find(NextButton).simulate('click');
        wrapper.find(PrevButton).simulate('click');
        wrapper.find(PrevButton).simulate('click');

        expect(Element.prototype.scrollTo).toBeCalledTimes(2);
    });

    it('tests scrolling', () => {});
});
