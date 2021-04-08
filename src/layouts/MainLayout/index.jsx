import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {StyledLayout, StyledMain, StyledContainer} from './styles.js';

export const MainLayout = ({children}) => (
    <>
        <Header />
        <StyledLayout>
            <StyledContainer maxWidth="xl">
                <StyledMain>{children}</StyledMain>
            </StyledContainer>
        </StyledLayout>
        <Footer />
    </>
);

MainLayout.propTypes = {
    location: PropTypes.object,
    children: PropTypes.any,
};

export const isEqual = (prevProps, nextProps) =>
    prevProps?.location?.pathname == nextProps?.location?.pathname;

export default React.memo(withRouter(MainLayout), isEqual);
