import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import {StyledCompanyArticle} from './styles';
import MediaContainer from '../../containers/MediaContainer';

const {COMPANIES} = ENUMS.MEDIA_TYPE;

export const CompanyPage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle
        title={formatMessage({
            id: 'companyPage.title',
            defaultMessage: 'Company',
        })}>
        <StyledCompanyArticle>
            <MediaContainer guid={match.params.guid} mediaType={COMPANIES} />
        </StyledCompanyArticle>
    </DocumentTitle>
);

CompanyPage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(CompanyPage);
