import React from 'react';
import {MediaListItem, isEqual} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<MediaListItem/>', () => {
    it('renders with data as expected', () => {
        const wrapper = renderWithBaseWrapper(
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
        );
        expect(wrapper.queryAllByTestId('item-loading').length).toEqual(0);
        expect(wrapper.getAllByTestId('item-loaded').length).toEqual(1);
        expect(wrapper.getAllByText('name').length).toEqual(1);
        expect(wrapper.getAllByText('deck').length).toEqual(1);
    });

    it('renders loader as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <MediaListItem isLoading={true} />
        );
        expect(wrapper.getAllByTestId('item-loading').length).toEqual(1);
        expect(wrapper.queryAllByTestId('item-loaded').length).toEqual(0);
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
