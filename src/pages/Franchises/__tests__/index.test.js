import React from 'react';
import {shallow} from 'enzyme';
import {FranchisesPage, submitForm} from '../index';

describe('<FranchisesPage/>', () => {
    it('verifys submitForm works as expected', () => {
        const e = {preventDefault: jest.fn()};
        submitForm(e);
        expect(e.preventDefault).toBeCalledTimes(1);
    });

    it('runs a snapshot test', () => {
        const wrapper = shallow(
            <FranchisesPage intl={{formatMessage: () => ''}} />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
