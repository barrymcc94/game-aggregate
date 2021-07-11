import React from 'react';
import {act, fireEvent} from '@testing-library/react';
import SearchBar from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<SearchBar/>', () => {
    it('successfully renders and triggers an onchange event', () => {
        const onChange = jest.fn();
        const wrapper = renderWithBaseWrapper(
            <SearchBar id="test" label="test" value="" onChange={onChange} />
        );
        const searchInput = wrapper.getByLabelText('test');
        act(() => {
            fireEvent.change(searchInput, {target: {value: '123'}});
        });
        expect(onChange).toBeCalledTimes(1);
    });
});
