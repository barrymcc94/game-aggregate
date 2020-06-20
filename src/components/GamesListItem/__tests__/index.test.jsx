import React from "react";
import {GamesListItem} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<GamesListItem/>', () => {
    it('run a snapshot test', () => {
        expect(mountWithBaseWrapper(<GamesListItem game={{
            name: 'name',
            deck: 'deck',
            original_release_date: 'date',
            image: {
                screen_url: 'test'
            }
        }}/>)).toMatchSnapshot();
    });
});