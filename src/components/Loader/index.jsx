import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledLoaderContainer,
    StyledLoader,
    StyledAriaLoader,
} from './styles.js';
import {FormattedMessage} from 'react-intl';

export const AriaLoader = ({
    politeness = 'assertive',
    isLoading,
    loadingMessageId = 'ariaLoader.loading',
    loadedMessageId = 'ariaLoader.loaded',
}) => (
    <StyledAriaLoader aria-live={politeness}>
        <FormattedMessage id={isLoading ? loadingMessageId : loadedMessageId} />
    </StyledAriaLoader>
);

AriaLoader.propTypes = {
    politeness: PropTypes.string,
    isLoading: PropTypes.bool,
    loadingMessageId: PropTypes.string,
    loadedMessageId: PropTypes.string,
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
