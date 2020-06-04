import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {ThemeProvider} from 'styled-components'
import {StylesProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {CssBaseline, ThemeProvider as MuiThemeProvider} from '@material-ui/core';
import messages from './transaltions';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import GamePage from './pages/Game';
import SearchPage from './pages/Search'
import AboutPage from './pages/About';
import ErrorPage from './pages/Error';
import Styles from './common-styles';
import theme from './theme';

class App extends React.Component {

    shouldComponentUpdate(nextProps) {
        const {location, locale} = this.props;
        const locationChange = !(location.pathname == nextProps.location.pathname);
        const localeChange = !(locale == nextProps.locale);
        return locationChange || localeChange;
    }

    render() {
        const {locale} = this.props;
        return (
            <IntlProvider locale={locale} messages={messages[locale]}>
                <MuiThemeProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <StylesProvider injectFirst>
                            <MainLayout>
                                <Styles />
                                <CssBaseline />
                                <Switch>
                                    <Route exact path='/' component={HomePage} />
                                    <Route exact path='/games' component={HomePage} />
                                    <Route exact path='/games/:guid' component={GamePage} />
                                    <Route exact path='/search' component={SearchPage} />
                                    <Route exact path='/about' component={AboutPage} />
                                    <Route path="/404" component={ErrorPage} />
                                    <Route path="*" render={() => (<Redirect to='/404' />)} />
                                </Switch>
                            </MainLayout>
                        </StylesProvider>
                    </ThemeProvider>
                </MuiThemeProvider>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locale: state.locale.currentLocale,
    }
}

App.propTypes = {
    location: PropTypes.object,
    locale: PropTypes.string,
    setLocale: PropTypes.func,
}

export default connect(mapStateToProps)(withRouter(App));
