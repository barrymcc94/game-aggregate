import React from 'react';
import {Franchise} from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledErrorMessage} from '../../ErrorMessage/styles';
import {StyledMediaHeader} from '../../MediaHeader/styles';

describe('<Franchise/>', () => {
    it('tests error message appears when error exists', () => {
        const wrapper = mountWithBaseWrapper(
            <Franchise
                isFetching={false}
                error={true}
                franchise={{}}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledErrorMessage)).toBe(true);
        expect(wrapper.exists(StyledMediaHeader)).toBe(false);
    });

    it('tests error message appears when franchise data is invalid', () => {
        const wrapper = mountWithBaseWrapper(
            <Franchise
                isFetching={true}
                error={true}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.exists(StyledErrorMessage)).toBe(true);
        expect(wrapper.exists(StyledMediaHeader)).toBe(false);
    });

    it('tests franchise renders as expected with franchise data', () => {
        const wrapper = mountWithBaseWrapper(
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
        expect(wrapper.exists(StyledErrorMessage)).toBe(false);
        expect(wrapper.exists(StyledMediaHeader)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});
