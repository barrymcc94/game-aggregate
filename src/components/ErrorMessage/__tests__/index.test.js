import React from 'react';
import ErrorMessage, {isEqual} from '../index';
import {renderWithBaseWrapper} from '../../../../tests/helper';

describe('<ErrorMessage/>', () => {
    it('renders when error prop is true', () => {
        const wrapper = renderWithBaseWrapper(
            <ErrorMessage
                message="Click here to go back to the homepage"
                error={true}
            />
        );
        expect(
            wrapper.getByText('Click here to go back to the homepage')
        ).toBeTruthy();
    });

    it('does not render when error prop is false', () => {
        const wrapper = renderWithBaseWrapper(
            <ErrorMessage
                message="Click here to go back to the homepage"
                error={false}
            />
        );
        expect(wrapper.html).toEqual(undefined);
    });

    it('does not render when id prop is falsy', () => {
        const wrapper = renderWithBaseWrapper(<ErrorMessage error={true} />);
        expect(wrapper.html).toEqual(undefined);
    });

    it('tests isEqual function', () => {
        expect(isEqual({error: true}, {error: true})).toEqual(true);
        expect(isEqual({error: true}, {error: false})).toEqual(false);
    });
});
