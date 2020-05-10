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

    it('tests Container Component with offset larger than total', () => {
        mountWithBaseWrapper(<GamesContainer {...{
            ...defaultProps, meta: {
                offset: 10,
                total: 5
            }
        }} />);
        expect(fetchGames).toBeCalledTimes(0);
    });

    it('tests mounting with store', () => {
        const store = mockStore({
            games: {
                byId: {},
                ids: [],
                meta: {
                    limit: 50,
                    offset: 0,
                    total: -1
                },
                isFetching: false,
                error: false
            },
        });
        const wrapper = mountWithBaseWrapper(<Provider store={store}><Container /></Provider>);
        wrapper.unmount();
        expect(store.getActions().length).toEqual(1);
        expect(store.getActions()[0].type).toEqual('FETCH_GAMES_STARTED');
    });

    it('tests scrolling loads more whe over halfway down page', () => {
        mountWithBaseWrapper(<GamesContainer {...defaultProps} />);
        global.pageYOffset = 100;
        global.dispatchEvent(new Event('scroll'));
        expect(fetchGames).toBeCalledTimes(2);
    });

    it('tests scrolling does not load more when less than halfway down page', () => {
        mountWithBaseWrapper(<GamesContainer {...defaultProps} />);
        global.pageYOffset = -1;
        global.dispatchEvent(new Event('scroll'));
        expect(fetchGames).toBeCalledTimes(1);
    });
});