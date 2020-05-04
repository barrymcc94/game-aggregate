import React from "react";
import {GamesListItem} from '../index'
import {testRenderer} from '../../../../tests/helper';

describe('<GamesListItem/>', () => {
    it('run a snapshot test', () => {
        expect(testRenderer(<GamesListItem game={{
            name: 'name',
            deck: 'deck',
            original_release_date: 'date',
            image: {
                screen_url: 'test'
            }
        }}/>).toJSON()).toMatchSnapshot();
    });
});