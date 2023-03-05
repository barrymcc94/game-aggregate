import React from 'react';
import userEvent from '@testing-library/user-event';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import Arrows, {getBtnStyle} from '../Arrows';
import {waitFor} from '@testing-library/react';

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
    it('tests carousel renders and arrows are clickable', async () => {
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

        userEvent.click(prevBtn);

        await waitFor(() => {
            expect(prevClick).toHaveBeenCalledTimes(1);
        });

        userEvent.click(nextBtn);

        await waitFor(() => {
            expect(nextClick).toHaveBeenCalledTimes(1);
        });
    });
});
