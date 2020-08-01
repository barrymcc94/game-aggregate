import React from "react";
import {Company} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledErrorMessage} from "../../ErrorMessage/styles";
import {StyledMediaHeader} from "../../MediaHeader/styles";

describe('<Company/>', () => {
    it('tests error message appears when error exists', () => {
        const wrapper = mountWithBaseWrapper(<Company
            isFetching={false}
            error={true}
            company={{}}
            gamesData={{
                publishedGames: [],
                developedGames: [],
                isFetching: false,
                error: false,
            }}
            intl={{formatMessage: jest.fn()}}
        />);
        expect(wrapper.exists(StyledErrorMessage)).toBe(true);
        expect(wrapper.exists(StyledMediaHeader)).toBe(false);
    });

    it('tests error message appears when company data is invalid', () => {
        const wrapper = mountWithBaseWrapper(<Company
            isFetching={true}
            error={true}
            gamesData={{
                publishedGames: [],
                developedGames: [],
                isFetching: false,
                error: false,
            }}
            intl={{formatMessage: jest.fn()}}
        />);
        expect(wrapper.exists(StyledErrorMessage)).toBe(true);
        expect(wrapper.exists(StyledMediaHeader)).toBe(false);
    });

    it('tests company renders as expected with game data', () => {
        const wrapper = mountWithBaseWrapper(<Company
            isFetching={false}
            error={false}
            gamesData={{
                publishedGames: [{guid: 'game1', id: 1}],
                developedGames: [],
                isFetching: false,
                error: false,
            }}
            company={{
                id: 1,
                guid: '123-123',
                name: 'name',
                deck: 'deck',
                date_founded: 'date',
                image: {
                    screen_url: 'test'
                }
            }}
            intl={{formatMessage: jest.fn()}}
        />);
        expect(wrapper.exists(StyledErrorMessage)).toBe(false);
        expect(wrapper.exists(StyledMediaHeader)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});