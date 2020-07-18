import React from "react";
import {CompanyContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<CompanyContainer/>', () => {
    const fetchCompany = jest.fn(() => {});

    const defaultProps = {
        guid: '123',
        company: {guid: '123'},
        isFetching: false,
        error: false,
        fetchCompany
    };

    beforeEach(() => {
        fetchCompany.mockClear();
    });

    it('tests Container Component', () => {
        mountWithBaseWrapper(<CompanyContainer {...defaultProps} />);
        expect(fetchCompany).toBeCalledTimes(1);
    });
});