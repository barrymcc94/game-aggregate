import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {StyledFranchiseArticle} from './styles';
import FranchiseContainer from '../../containers/FranchiseContainer';

export const FranchisePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle
        title={formatMessage({
            id: 'franchisePage.title',
            defaultMessage: 'Franchise',
        })}>
        <StyledFranchiseArticle>
            <FranchiseContainer guid={match.params.guid} />
        </StyledFranchiseArticle>
    </DocumentTitle>
);

FranchisePage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(FranchisePage);
