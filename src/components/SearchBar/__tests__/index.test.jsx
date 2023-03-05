import React from 'react';
import userEvent from '@testing-library/user-event';
import {waitFor} from '@testing-library/react';
import SearchBar from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<SearchBar/>', () => {
    it('successfully renders and triggers an onchange event', async () => {
        const onChange = jest.fn();
        const wrapper = renderWithBaseWrapper(
            <SearchBar id="test" label="test" value="" onChange={onChange} />
        );
        const searchInput = wrapper.getByLabelText('test');
        userEvent.type(searchInput, '123');
        await waitFor(() => {
            expect(onChange).toBeCalledTimes(3);
        });
    });
});
