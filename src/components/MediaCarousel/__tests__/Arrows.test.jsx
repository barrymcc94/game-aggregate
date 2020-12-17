import React from 'react';
import {act} from 'react-dom/test-utils';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import Arrows, {getBtnStyle} from '../Arrows';

describe('<Arrows/> functions', () => {
    it('tests getBtnStyle', () => {
        expect(getBtnStyle(true)).toEqual({});
        expect(getBtnStyle(false)).toEqual({
            display: 'none',
            visibility: 'hidden',
        });
    });
});

describe('<Arrows/>', () => {
    it('tests carousel renders and arrows are clickable', () => {
        const prevClick = jest.fn();
        const nextClick = jest.fn();
        const wrapper = mountWithBaseWrapper(
            <Arrows
                showPrev={true}
                showNext={true}
                onPrevClick={prevClick}
                onNextClick={nextClick}
                intl={{formatMessage: jest.fn()}}
            />
        );
        const prevBtn = wrapper.find('button').at(0);
        const nextBtn = wrapper.find('button').at(1);
        act(() => {
            prevBtn.simulate('click');
            nextBtn.simulate('click');
        });
        expect(prevClick).toHaveBeenCalledTimes(1);
        expect(nextClick).toHaveBeenCalledTimes(1);
    });
});
