import React from 'react';
import SearchBar from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<SearchBar/>', () => {
    it('run a snapshot test', () => {
        expect(
            mountWithBaseWrapper(
                <SearchBar
                    id="test"
                    label="test"
                    searchLabel="search"
                    value=""
                    onChange={() => {}}
                />
            )
        ).toMatchSnapshot();
    });
});
