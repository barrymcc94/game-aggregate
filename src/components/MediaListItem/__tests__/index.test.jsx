import React from "react";
import {MediaListItem} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaListItem/>', () => {
    it('run a snapshot test', () => {
        expect(mountWithBaseWrapper(<MediaListItem game={{
            name: 'name',
            deck: 'deck',
            original_release_date: 'date',
            image: {
                screen_url: 'test'
            }
        }}/>)).toMatchSnapshot();
    });
});