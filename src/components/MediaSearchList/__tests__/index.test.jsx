import React from 'react';
import {act, fireEvent} from '@testing-library/react';
import MediaSearchList, {submitForm} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

jest.useFakeTimers();

const mockDebouncedFunc = jest.fn();

jest.mock('../../../hooks', () => ({
    ...jest.requireActual('../../../hooks'),
    useDebounce: jest.fn((value) => {
        mockDebouncedFunc();
        return value;
    }),
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

    it('tests MediaSearchList with games props', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaSearchList {...defaultProps} />
        );
        const searchInput = wrapper.getByLabelText('search');
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'test input'}});
        });
        expect(mockDebouncedFunc).toHaveBeenCalled();
    });
});
