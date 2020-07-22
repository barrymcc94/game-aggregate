import React from "react";
import MediaSearchContainer from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import debounce from 'lodash.debounce';
jest.mock('lodash.debounce');
jest.useFakeTimers();

describe('<MediaSearchContainer/>', () => {
    const setSearchFilters = jest.fn();
    debounce.mockImplementation(fn => fn);

    const defaultProps = {
        searchId: 'test_id',
        searchLabel: 'search',
        filter: {},
        setSearchFilters
    };

    beforeEach(() => {
        setSearchFilters.mockClear();
    });

    it('tests MediaSearchContainer', () => {
        const wrapper = mountWithBaseWrapper(<MediaSearchContainer {...defaultProps} />);
        wrapper.find('input').simulate('change', {target: {value: 'test input'} });
        expect(setSearchFilters).toBeCalledTimes(1);
    });

});