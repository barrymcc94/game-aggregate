import React from "react";
import {GamesList} from '../index'
import {testRenderer} from '../../../../tests/helper';

describe('<GamesListItem/>', () => {
    it('run a snapshot test', () => {
        expect(testRenderer(<GamesList
            isFetching={false}
            error={false}
            games={[{
            id: 1,
            name: 'name',
            deck: 'deck',
            original_release_date: 'date',
            image: {
                screen_url: 'test'
            }
        }]}/>).toJSON()).toMatchSnapshot();
    });
});