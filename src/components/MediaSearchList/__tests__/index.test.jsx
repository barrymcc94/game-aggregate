import React from 'react';
import userEvent from '@testing-library/user-event';
import MediaSearchList, {submitForm} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';
import {waitFor} from '@testing-library/react';

jest.useFakeTimers();

const mockDebouncedFunc = jest.fn();

jest.mock('../../../hooks', () => ({
    ...jest.requireActual('../../../hooks'),
    useDebounce: (value) => {
        mockDebouncedFunc(value);
        return value;
    },
}));

describe('<MediaSearchList/>', () => {
    const defaultProps = {
        mediaType: 'games',
        id: 'test_id',
        label: 'search',
    };

    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('tests MediaSearchList with games props', async () => {
        const wrapper = renderWithBaseWrapper(
            <MediaSearchList {...defaultProps} />
        );
        const searchInput = wrapper.getByLabelText('search');
        userEvent.type(searchInput, 'test input');
        await waitFor(() => {
            expect(mockDebouncedFunc).toHaveBeenCalledWith('test input');
        });
    });
});
