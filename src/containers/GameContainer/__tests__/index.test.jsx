import React from "react";
import {GameContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<GameContainer/>', () => {
    const fetchGame = jest.fn(() => {});

    const defaultProps = {
        guid: '123',
        game: {guid: '123'},
        isFetching: false,
        error: false,
        fetchGame
    };

    beforeEach(() => {
        fetchGame.mockClear();
    });

    it('tests Container Component', () => {
        mountWithBaseWrapper(<GameContainer {...defaultProps} />);
        expect(fetchGame).toBeCalledTimes(1);
    });

    it('tests loaded Container Component', () => {
        const props = {...defaultProps, game: {...defaultProps.game, developers: []}};
        mountWithBaseWrapper(<GameContainer {...props} />);
        expect(fetchGame).toBeCalledTimes(0);
    });
});