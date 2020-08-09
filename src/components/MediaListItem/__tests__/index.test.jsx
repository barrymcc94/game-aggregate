import React from 'react';
import {MediaListItem, isEqual} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaListItem/>', () => {
    it('run a snapshot test', () => {
        expect(
            mountWithBaseWrapper(
                <MediaListItem
                    item={{
                        guid: 'guid',
                        name: 'name',
                        deck: 'deck',
                        date_founded: '2000-06-20',
                        image: {
                            screen_url: 'test',
                        },
                    }}
                />
            )
        ).toMatchSnapshot();
    });

    it('tests isEqual function', () => {
        expect(
            isEqual(
                {isLoading: true, item: {guid: '1'}},
                {isLoading: true, item: {guid: '1'}}
            )
        ).toEqual(true);
        expect(
            isEqual(
                {isLoading: true, item: {guid: '1'}},
                {isLoading: false, item: {guid: '1'}}
            )
        ).toEqual(false);
    });
});
