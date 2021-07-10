import React from 'react';
import {Game} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Game/>', () => {
    it('tests error message appears when error exists', () => {
        const wrapper = renderWithBaseWrapper(
            <Game
                isFetching={false}
                error={true}
                game={{}}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        // error-message
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.queryByTestId('media-header')).toBeFalsy();
    });

    it('tests error message appears when game data is invalid', () => {
        const wrapper = renderWithBaseWrapper(
            <Game
                isFetching={true}
                error={true}
                intl={{formatMessage: () => 'temp message'}}
            />
        );
        expect(wrapper.getByTestId('error-message')).toBeTruthy();
        expect(wrapper.queryByTestId('media-header')).toBeFalsy();
    });

    it('tests game renders as expected with game data', () => {
        const wrapper = renderWithBaseWrapper(
            <Game
                isFetching={false}
                error={false}
                game={{
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
        expect(wrapper.queryByTestId('media-header')).toBeTruthy();
    });
});
