import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import DocumentTitle from '../../components/DocumentTitle';
import {ErrorSection, ErrorHeader, ErrorText, StyledLink} from './styles';

export const NotFoundPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'notFoundPage.title'})}>
        <ErrorSection>
            <ErrorHeader>
                <FormattedMessage id="notFoundPage.errorHeading" />
            </ErrorHeader>
            <ErrorText>
                <StyledLink to={'/'}>
                    <FormattedMessage id="notFoundPage.errorMessage" />
                </StyledLink>
            </ErrorText>
        </ErrorSection>
    </DocumentTitle>
);

NotFoundPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(NotFoundPage);
