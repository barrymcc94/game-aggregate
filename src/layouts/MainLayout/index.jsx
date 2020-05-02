import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import {withRouter} from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import {StyledLayout, StyledMain} from './styles.js';

class MainLayout extends React.Component {

    shouldComponentUpdate(nextProps) {
        const {location} = this.props;
        if (location.pathname == nextProps.location.pathname) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                    <StyledLayout>
                        <Container maxWidth="lg">
                            <StyledMain>
                                {this.props.children}
                            </StyledMain>
                        </Container>
                    </StyledLayout>
                <Footer/>
            </React.Fragment>
        );
    }
}

MainLayout.propTypes = {
    location: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default withRouter(MainLayout);
