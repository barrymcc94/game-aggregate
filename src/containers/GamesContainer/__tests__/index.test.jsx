import React from "react";
import Container, {GamesContainer} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {Provider} from 'react-redux'
import {mockStore} from '../../../../tests/setup';

describe('<GamesContainer/>', () => {
    const fetchGames = jest.fn();
    const defaultProps = {
        games: [],
        isFetching: false,
        error: false,
        meta: {},
        fetchGames
    };

    beforeEach(() => {
        fetchGames.mockClear();
    });

    it('tests mounting with Container Component', () => {
        mountWithBaseWrapper(<GamesContainer {...defaultProps} />);
        expect(fetchGames).toBeCalledTimes(1);
    });

    it('tests mounting with store', () => {
        const store = mockStore({
            games: {byId: {}, ids: [], isFetching: false, error: false},
        });
        mountWithBaseWrapper(<Provider store={store}><Container /></Provider>);
        expect(fetchGames.mock.calls.length).toBe(0);
    });
});