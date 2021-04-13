import React from 'react';
import AriaLoader from '../index';
import {mountWithBaseWrapper} from '../../../../tests/helper';

describe('<Loader/>', () => {
    it('tests loading and loaded messages appear', () => {
        expect(
            mountWithBaseWrapper(
                <AriaLoader
                    isLoading={true}
                    loadingMessage="loading"
                    loadedMessage="loaded"
                />
            ).text()
        ).toEqual('loading');
        expect(
            mountWithBaseWrapper(
                <AriaLoader
                    isLoading={false}
                    loadingMessage="loading"
                    loadedMessage="loaded"
                />
            ).text()
        ).toEqual('loaded');
    });

    it('to return null when not loading and no children supplied', () => {
        expect(
            mountWithBaseWrapper(<AriaLoader isLoading={false} />).text()
        ).toEqual('');
    });
});
