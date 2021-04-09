import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledFranchiseSection} from './styles';

const {FRANCHISES} = ENUMS.MEDIA_TYPE;

export const FranchisePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'franchisePage.title'})}>
        <StyledFranchiseSection>
            <MediaContainer guid={match.params.guid} mediaType={FRANCHISES} />
        </StyledFranchiseSection>
    </DocumentTitle>
);

FranchisePage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(FranchisePage);
