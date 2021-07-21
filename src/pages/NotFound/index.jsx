import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';
import DocumentTitle from '../../components/DocumentTitle';
import {ErrorSection, ErrorHeader, ErrorText} from './styles';

export const NotFoundPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'notFoundPage.title'})}>
        <ErrorSection>
            <ErrorHeader>
                <FormattedMessage id="notFoundPage.errorHeading" />
            </ErrorHeader>
            <ErrorText>
                <Link to={'/'}>
                    <FormattedMessage id="notFoundPage.errorMessage" />
                </Link>
            </ErrorText>
        </ErrorSection>
    </DocumentTitle>
);

NotFoundPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(NotFoundPage);
