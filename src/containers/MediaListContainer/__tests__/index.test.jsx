import React from "react";
import Container from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaListContainer/>', () => {
    const loadMore = jest.fn(() => {});

    const defaultProps = {
        loadMore,
        items: [],
        error: false,
        isFetching: false
    };

    beforeEach(() => {
        loadMore.mockClear();
    });

    it('tests scrolling loads more when over 80% down page', () => {
        mountWithBaseWrapper(<Container {...defaultProps} />);
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(loadMore).toBeCalledTimes(1);
    });

    it('tests scrolling does not load more when less than 80% down page', () => {
        mountWithBaseWrapper(<Container {...defaultProps} />);
        global.pageYOffset = -1;
        global.dispatchEvent(new Event('scroll'));
        expect(loadMore).toBeCalledTimes(0);
    });
});