import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledFranchiseArticle} from './styles';

const {FRANCHISES} = ENUMS.MEDIA_TYPE;

export const FranchisePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'franchisePage.title'})}>
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
