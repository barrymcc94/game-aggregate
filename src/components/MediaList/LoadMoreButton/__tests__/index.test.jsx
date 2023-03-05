import React from 'react';
import userEvent from '@testing-library/user-event';
import {LoadMoreButton} from '../index';
import {renderWithBaseWrapper} from '../../../../../tests/helper';
import {waitFor} from '@testing-library/react';

describe('<MediaList/>', () => {
    it('tests Component renders null with invalid props', () => {
        const wrapper = renderWithBaseWrapper(
            <LoadMoreButton isLoading={false} />
        );

        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
        expect(wrapper.queryAllByTestId('load-more-btn').length).toEqual(0);
    });

    it('tests Component renders skeleton loader when loading', () => {
        const wrapper = renderWithBaseWrapper(
            <LoadMoreButton text="test" isLoading={true} />
        );
        expect(wrapper.queryAllByTestId('loader').length).toEqual(1);
        expect(wrapper.queryAllByTestId('load-more-btn').length).toEqual(0);
    });

    it('tests Component with load more button', async () => {
        const onClick = jest.fn(() => {});
        const wrapper = renderWithBaseWrapper(
            <LoadMoreButton text="test" isLoading={false} onClick={onClick} />
        );
        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
        userEvent.click(wrapper.getByTestId('load-more-btn'));

        await waitFor(() => {
            expect(onClick).toBeCalledTimes(1);
        });
    });

    it('tests Component with load more button', async () => {
        const onClick = jest.fn(() => {});
        const wrapper = renderWithBaseWrapper(
            <LoadMoreButton
                text="test"
                isLoading={false}
                link={'/'}
                buttonType="link"
                onClick={onClick}
            />
        );

        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
        userEvent.click(wrapper.getByTestId('load-more-btn'));

        await waitFor(() => {
            expect(onClick).toBeCalledTimes(0);
        });
    });
});
