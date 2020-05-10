import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {StyledErrorMessage} from './styles.js';

const ErrorMessage = ({id, error, children}) => (
    id && error
        ? <StyledErrorMessage>
            <FormattedMessage id={id} defaultMessage="Error Occurred" />
        </StyledErrorMessage>
        : (children || null)
)

ErrorMessage.propTypes = {
    id: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    children: PropTypes.any,
}

export default injectIntl(ErrorMessage);