import React from 'react';
import {ListHeading} from '../index';
import {renderWithBaseWrapper} from '../../../../../tests/helper';

describe('<ListHeading/>', () => {
    it('tests Component renders as expected', () => {
        const wrapper = renderWithBaseWrapper(
            <ListHeading title="New and upcoming games" isLoading={false} />
        );

        expect(wrapper.queryAllByTestId('loader').length).toEqual(0);
        expect(wrapper.getByText('New and upcoming games')).toBeTruthy();
    });

    it('tests Component renders skeleton loader when loading', () => {
        const wrapper = renderWithBaseWrapper(
            <ListHeading title="id" isLoading={true} displayTitle={true} />
        );

        expect(wrapper.getAllByTestId('loader').length).toEqual(1);
    });
});
