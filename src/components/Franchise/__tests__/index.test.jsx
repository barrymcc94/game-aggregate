import React from 'react';
import {Franchise} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Franchise/>', () => {
    it('tests error message appears when error exists', () => {
        const wrapper = renderWithBaseWrapper(
            <Franchise
                isFetching={false}
                error={true}
                franchise={{}}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.queryByTestId('media-header')).toBeFalsy();
    });

    it('tests error message appears when franchise data is invalid', () => {
        const wrapper = renderWithBaseWrapper(
            <Franchise
                isFetching={true}
                error={true}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.queryByTestId('media-header')).toBeFalsy();
    });

    it('tests franchise renders as expected with franchise data', () => {
        const wrapper = renderWithBaseWrapper(
            <Franchise
                isFetching={false}
                error={false}
                franchise={{
                    id: 1,
                    guid: '123-123',
                    name: 'name',
                    deck: 'deck',
                    original_release_date: '2000-01-01T12:00:00.000Z',
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
