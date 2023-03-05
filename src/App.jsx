import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {ThemeProvider} from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchGBApiKeySucceeded} from './redux/actions';
import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
} from '@mui/material';
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
import NotFoundPage from './pages/NotFound';
import Styles from './common-styles';
import {ENUMS} from './config';
import theme from './theme';
smoothscroll.polyfill();

const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const App = ({locale, fetchGBApiKeySucceeded}) => {
    let location = useLocation();
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
            <StyledEngineProvider injectFirst>
                <MuiThemeProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Styles />
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path={`/${GAMES}/`}
                                    element={<GamesPage />}
                                />
                                <Route
                                    path={`/${GAMES}/:guid`}
                                    element={<GamePage />}
                                />
                                <Route
                                    path={`/${COMPANIES}/`}
                                    element={<CompaniesPage />}
                                />
                                <Route
                                    path={`/${COMPANIES}/:guid`}
                                    element={<CompanyPage />}
                                />
                                <Route
                                    path={`/${FRANCHISES}/`}
                                    element={<FranchisesPage />}
                                />
                                <Route
                                    path={`/${FRANCHISES}/:guid`}
                                    element={<FranchisePage />}
                                />
                                <Route path="/about" element={<AboutPage />} />
                                <Route
                                    path="/empty"
                                    element={() => <div></div>}
                                />
                                <Route path="/404" element={<NotFoundPage />} />
                                <Route
                                    path="*"
                                    element={<Navigate to="/404" />}
                                />
                            </Routes>
                        </MainLayout>
                    </ThemeProvider>
                </MuiThemeProvider>
            </StyledEngineProvider>
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
    locale: PropTypes.string,
    fetchGBApiKeySucceeded: PropTypes.func,
};

export const isEqual = ({locale, gbKey}, nextProps) =>
    locale == nextProps.locale && gbKey == nextProps.gbKey;

export default React.memo(
    connect(mapStateToProps, mapDispatchToProps)(App),
    isEqual
);
