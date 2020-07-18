import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {StyledCompanyArticle} from './styles';
import CompanyContainer from '../../containers/CompanyContainer';

export const CompanyPage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "companyPage.title", defaultMessage: "Company"})}>
        <StyledCompanyArticle>
            <CompanyContainer guid={match.params.guid}/>
        </StyledCompanyArticle>
    </DocumentTitle>
);

CompanyPage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
}

export default injectIntl(CompanyPage);
