/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {MemoryRouter} from 'react-router';
import {ThemeProvider} from 'styled-components';
import messages from '../src/translations';
import theme from '../src/theme';
const defaultLocale = 'en';
const locale = defaultLocale;

const BaseWrapper = ({children, store}) => (
    <Provider store={store || global.helperStore}>
        <MemoryRouter initialEntries={['/']}>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </IntlProvider>
        </MemoryRouter>
    </Provider>
);

BaseWrapper.propTypes = {
    children: PropTypes.any,
    store: PropTypes.any,
};

export const mountWithBaseWrapper = (node, store) =>
    mount(node, {
        wrappingComponent: BaseWrapper,
        wrappingComponentProps: {
            store,
        },
    });

export const shallowWithBaseWrapper = (node) =>
    shallow(node, {
        wrappingComponent: BaseWrapper,
        wrappingComponentProps: {
            locale,
        },
    });

export const testRenderer = (component) =>
    renderer.create(BaseWrapper({children: component}));

export const renderWithBaseWrapper = (ui, options) =>
    render(ui, {wrapper: BaseWrapper, ...options});
