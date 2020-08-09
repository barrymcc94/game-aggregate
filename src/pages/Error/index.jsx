import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router-dom';
import {ErrorSection, ErrorHeader, ErrorText} from './styles';
import {FormattedMessage, injectIntl} from 'react-intl';

export const ErrorPage = ({intl: {formatMessage}}) => (
    <DocumentTitle
        title={formatMessage({
            id: 'errorPage.title',
            defaultMessage: '404 - Page Not Found',
        })}>
        <ErrorSection>
            <ErrorHeader>
                <FormattedMessage
                    id="errorPage.errorHeading"
                    defaultMessage="404 - Page Not Found"
                />
            </ErrorHeader>
            <ErrorText>
                <Link to={'/'}>
                    <FormattedMessage
                        id="errorPage.errorMessage"
                        defaultMessage="Click here to go back to the homepage"
                    />
                </Link>
            </ErrorText>
        </ErrorSection>
    </DocumentTitle>
);

ErrorPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(ErrorPage);
