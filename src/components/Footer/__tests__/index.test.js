import React from "react";
import Footer from "../index";
import {testRenderer} from '../../../../tests/helper';

describe('<Footer/>', () => {
    it('renders correctly', () => {
        const component = <Footer />;
        expect(testRenderer(component).toJSON()).toMatchSnapshot();
    });
});