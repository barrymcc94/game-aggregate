/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux'
import {IntlProvider} from 'react-intl';
import {MemoryRouter} from 'react-router';
import {ThemeProvider} from 'styled-components'
import messages from '../src/translations';
import theme from '../src/theme';
const defaultLocale = 'en';
const locale = defaultLocale;

const BaseWrapper = ({children}) => <Provider store={global.helperStore}>
    <MemoryRouter initialEntries={['/']}>
        <IntlProvider locale="en">
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </IntlProvider>
    </MemoryRouter>
</Provider>;

BaseWrapper.propTypes = {
    children: PropTypes.any
}

export const mountWithBaseWrapper = (node) => (
    mount(node, {
        wrappingComponent: BaseWrapper,
        wrappingComponentProps: {
            locale,
            defaultLocale,
            messages: {locale: defaultLocale, ...messages.en},
        },
    })
)

export const shallowWithBaseWrapper = (node) => (
    shallow(node, {
        wrappingComponent: BaseWrapper,
        wrappingComponentProps: {
            locale,
            defaultLocale,
            messages: {locale: defaultLocale, ...messages.en},
        },
    })
)

export const testRenderer = (component) => (
    renderer.create(BaseWrapper({children: component}))
)