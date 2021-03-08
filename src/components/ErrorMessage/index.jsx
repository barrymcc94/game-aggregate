import React from 'react';
import PropTypes from 'prop-types';
import {StyledErrorMessage} from './styles.js';

const ErrorMessage = ({message, error}) =>
    message && error ? (
        <StyledErrorMessage>{message}</StyledErrorMessage>
    ) : null;

ErrorMessage.propTypes = {
    message: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.message == nextProps.message &&
    prevProps.error == nextProps.error;
export default React.memo(ErrorMessage, isEqual);
