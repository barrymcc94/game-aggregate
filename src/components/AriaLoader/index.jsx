import React from 'react';
import PropTypes from 'prop-types';
import {StyledAriaLoader} from './styles.js';

export const AriaLoader = ({isLoading, loadingMessage, loadedMessage}) => (
    <StyledAriaLoader role="status">
        {isLoading ? loadingMessage : loadedMessage}
    </StyledAriaLoader>
);

AriaLoader.propTypes = {
    isLoading: PropTypes.bool,
    loadingMessage: PropTypes.string,
    loadedMessage: PropTypes.string,
};

export default AriaLoader;
