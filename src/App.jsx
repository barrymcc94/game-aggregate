import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {ThemeProvider} from 'styled-components';
import {StylesProvider} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchGBApiKeySucceeded} from './redux/actions';
import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import messages from './translations';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import GamePage from './pages/Game';
import CompanyPage from './pages/Company';
import CompaniesPage from './pages/Companies';
import FranchisePage from './pages/Franchise';
import FranchisesPage from './pages/Franchises';
import GamesPage from './pages/Games';
import AboutPage from './pages/About';
import ErrorPage from './pages/Error';
import Styles from './common-styles';
import {ENUMS} from './config';
import theme from './theme';
smoothscroll.polyfill();

const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const App = ({location, locale, fetchGBApiKeySucceeded}) => {
    const [loadedStorage, setLoadedStorage] = useState(false);

    useEffect(() => {
        const gbKey = localStorage.getItem('gbkey');
        if (gbKey) {
            fetchGBApiKeySucceeded({api_key: gbKey});
        }
        setLoadedStorage(true);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!loadedStorage) {
        return null;
    }
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <Styles />
                    <StylesProvider injectFirst>
                        <MainLayout>
                            <CssBaseline />
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route
                                    exact
                                    path={`/${GAMES}/`}
                                    component={GamesPage}
                                />
                                <Route
                                    exact
                                    path={`/${GAMES}/:guid`}
                                    component={GamePage}
                                />
                                <Route
                                    exact
                                    path={`/${COMPANIES}/`}
                                    component={CompaniesPage}
                                />
                                <Route
                                    exact
                                    path={`/${COMPANIES}/:guid`}
                                    component={CompanyPage}
                                />
                                <Route
                                    exact
                                    path={`/${FRANCHISES}/`}
                                    component={FranchisesPage}
                                />
                                <Route
                                    exact
                                    path={`/${FRANCHISES}/:guid`}
                                    component={FranchisePage}
                                />
                                <Route
                                    exact
                                    path="/about"
                                    component={AboutPage}
                                />
                                <Route
                                    exact
                                    path="/empty"
                                    component={() => <div></div>}
                                />
                                <Route path="/404" component={ErrorPage} />
                                <Route
                                    path="*"
                                    render={() => <Redirect to="/404" />}
                                />
                            </Switch>
                        </MainLayout>
                    </StylesProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </IntlProvider>
    );
};

const mapStateToProps = ({locale, auth}) => ({
    locale: locale.currentLocale,
    gbKey: auth.giantbomb.api_key,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({fetchGBApiKeySucceeded}, dispatch);

App.propTypes = {
    location: PropTypes.object,
    locale: PropTypes.string,
    fetchGBApiKeySucceeded: PropTypes.func,
};

export const isEqual = ({location, locale, gbKey}, nextProps) =>
    location?.pathname == nextProps?.location?.pathname &&
    locale == nextProps.locale &&
    gbKey == nextProps.gbKey;

export default React.memo(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(App)),
    isEqual
);
