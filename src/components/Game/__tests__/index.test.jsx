import React from "react";
import {Game} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledErrorMessage} from "../../ErrorMessage/styles";
import {StyledGameHeader} from "../../GameHeader/styles";

describe('<Game/>', () => {
    it('tests error message appears when error exists', () => {
        const wrapper = mountWithBaseWrapper(<Game
            isFetching={false}
            error={true}
            game={{}} />);
        expect(wrapper.exists(StyledErrorMessage)).toBe(true);
        expect(wrapper.exists(StyledGameHeader)).toBe(false);
    });

    it('tests error message appears when game data is invalid', () => {
        const wrapper = mountWithBaseWrapper(<Game
            isFetching={true}
            error={true}
            game={{}} />);
        expect(wrapper.exists(StyledErrorMessage)).toBe(true);
        expect(wrapper.exists(StyledGameHeader)).toBe(false);
    });

    it('tests game renders as expected with game data', () => {
        const wrapper = mountWithBaseWrapper(<Game
            isFetching={false}
            error={false}
            game={{
                id: 1,
                guid: '123-123',
                name: 'name',
                deck: 'deck',
                original_release_date: 'date',
                image: {
                    screen_url: 'test'
                }
            }} />);
        expect(wrapper.exists(StyledErrorMessage)).toBe(false);
        expect(wrapper.exists(StyledGameHeader)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});