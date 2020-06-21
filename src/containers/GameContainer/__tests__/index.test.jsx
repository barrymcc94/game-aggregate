import React from "react";
import Container, {GameContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {Provider} from 'react-redux'
import {mockStore} from '../../../../tests/setup';

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
});