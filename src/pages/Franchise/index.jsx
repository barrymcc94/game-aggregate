import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import {StyledFranchiseArticle} from './styles';
import MediaContainer from '../../containers/MediaContainer';

const {FRANCHISES} = ENUMS.MEDIA_TYPE;

export const FranchisePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle
        title={formatMessage({
            id: 'franchisePage.title',
            defaultMessage: 'Franchise',
        })}>
        <StyledFranchiseArticle>
            <MediaContainer guid={match.params.guid} mediaType={FRANCHISES} />
        </StyledFranchiseArticle>
    </DocumentTitle>
);

FranchisePage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(FranchisePage);
