import React from 'react';
import {act, fireEvent} from '@testing-library/react';
import {renderWithBaseWrapper} from '../../../../tests/helper';
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
        const wrapper = renderWithBaseWrapper(
            <Arrows
                showPrev={true}
                showNext={true}
                onPrevClick={prevClick}
                onNextClick={nextClick}
                intl={{formatMessage: jest.fn()}}
            />
        );
        const prevBtn = wrapper.getByTestId('prev-btn');
        const nextBtn = wrapper.getByTestId('next-btn');
        act(() => {
            fireEvent.click(prevBtn);
            fireEvent.click(nextBtn);
        });
        expect(prevClick).toHaveBeenCalledTimes(1);
        expect(nextClick).toHaveBeenCalledTimes(1);
    });
});
