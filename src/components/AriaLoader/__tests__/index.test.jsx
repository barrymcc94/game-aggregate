import React from 'react';
import AriaLoader from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<Loader/>', () => {
    it('tests loading and loaded messages appear', () => {
        const wrapper1 = renderWithBaseWrapper(
            <AriaLoader
                isLoading={true}
                loadingMessage="loading"
                loadedMessage="loaded"
            />
        );
        expect(wrapper1.getByText('loading')).toBeTruthy();

        const wrapper2 = renderWithBaseWrapper(
            <AriaLoader
                isLoading={false}
                loadingMessage="loading"
                loadedMessage="loaded"
            />
        );
        expect(wrapper2.getByText('loaded')).toBeTruthy();
    });

    it('to return null when not loading and no children supplied', () => {
        expect(
            renderWithBaseWrapper(<AriaLoader isLoading={false} />).html
        ).toEqual(undefined);
    });
});
