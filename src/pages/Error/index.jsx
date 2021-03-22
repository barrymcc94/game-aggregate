import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';
import DocumentTitle from '../../components/DocumentTitle';
import {ErrorSection, ErrorHeader, ErrorText} from './styles';

export const ErrorPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'errorPage.title'})}>
        <ErrorSection>
            <ErrorHeader>
                <FormattedMessage id="errorPage.errorHeading" />
            </ErrorHeader>
            <ErrorText>
                <Link to={'/'}>
                    <FormattedMessage id="errorPage.errorMessage" />
                </Link>
            </ErrorText>
        </ErrorSection>
    </DocumentTitle>
);

ErrorPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(ErrorPage);
