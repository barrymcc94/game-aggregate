import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledLoaderContainer,
    StyledLoader,
    StyledAriaLoader,
} from './styles.js';

export const AriaLoader = ({
    politeness = 'assertive',
    isLoading,
    loadingMessage,
    loadedMessage,
}) => (
    <StyledAriaLoader aria-live={politeness}>
        {isLoading ? loadingMessage : loadedMessage}
    </StyledAriaLoader>
);

AriaLoader.propTypes = {
    politeness: PropTypes.string,
    isLoading: PropTypes.bool,
    loadingMessage: PropTypes.string,
    loadedMessage: PropTypes.string,
};

export const Loader = ({isLoading, children}) =>
    isLoading ? (
        <StyledLoaderContainer>
            <StyledLoader size={50} />
        </StyledLoaderContainer>
    ) : (
        children || null
    );

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.any,
    intl: PropTypes.object,
};

export default Loader;
