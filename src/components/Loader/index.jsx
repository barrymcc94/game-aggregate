import React from 'react';
import PropTypes from 'prop-types';
import {StyledLoaderContainer, StyledLoader} from './styles.js';

const Loader = ({isLoading, children}) => (
    isLoading
        ? <StyledLoaderContainer>
            <StyledLoader size={50} />
        </StyledLoaderContainer>
        : (children || null)
)

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.any,
    intl: PropTypes.object,
}

export default Loader;