import React from 'react';
import {FranchiseContainer} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<FranchiseContainer/>', () => {
    const fetchFranchise = jest.fn(() => {});

    const defaultProps = {
        guid: '123',
        franchise: {guid: '123'},
        isFetching: false,
        error: false,
        fetchFranchise,
    };

    beforeEach(() => {
        fetchFranchise.mockClear();
    });

    it('tests Container Component', () => {
        mountWithBaseWrapper(<FranchiseContainer {...defaultProps} />);
        expect(fetchFranchise).toBeCalledTimes(1);
    });

    it('tests Container Component with no franchise', () => {
        mountWithBaseWrapper(
            <FranchiseContainer {...{...defaultProps, franchise: undefined}} />
        );
        expect(fetchFranchise).toBeCalledTimes(1);
    });

    it('tests loaded Container Component', () => {
        const props = {
            ...defaultProps,
            franchise: {...defaultProps.franchise, games: []},
        };
        mountWithBaseWrapper(<FranchiseContainer {...props} />);
        expect(fetchFranchise).toBeCalledTimes(0);
    });
});
