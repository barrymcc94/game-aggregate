import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {StyledLayout, StyledMain, StyledContainer} from './styles.js';

class MainLayout extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.location.pathname !== nextProps.location.pathname;
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                    <StyledLayout>
                        <StyledContainer maxWidth="lg">
                            <StyledMain>
                                {this.props.children}
                            </StyledMain>
                        </StyledContainer>
                    </StyledLayout>
                <Footer/>
            </React.Fragment>
        );
    }
}

MainLayout.propTypes = {
    location: PropTypes.object,
    children: PropTypes.any,
}

export default withRouter(MainLayout);
