import React from 'react';
import PropTypes from 'prop-types';
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
    children: PropTypes.any,
};

export default React.memo(MainLayout);
