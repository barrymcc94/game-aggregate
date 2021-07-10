import React from 'react';
import {Company} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Company/>', () => {
    it('tests error message appears when error exists', () => {
        const wrapper = renderWithBaseWrapper(
            <Company
                isFetching={false}
                error={true}
                company={{}}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.queryByTestId('media-header')).toBeFalsy();
    });

    it('tests error message appears when company data is invalid', () => {
        const wrapper = renderWithBaseWrapper(
            <Company
                isFetching={true}
                error={true}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.queryByTestId('media-header')).toBeFalsy();
    });

    it('tests company renders as expected with game data', () => {
        const wrapper = renderWithBaseWrapper(
            <Company
                isFetching={false}
                error={false}
                company={{
                    id: 1,
                    guid: '123-123',
                    name: 'name',
                    deck: 'deck',
                    date_founded: '2000-01-01T12:00:00.000Z',
                    image: {
                        screen_url: 'test',
                    },
                }}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.queryByTestId('error-message')).toBeFalsy();
        expect(wrapper.getByTestId('media-header')).toBeTruthy();
    });
});
