import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledFranchiseSection} from './styles';

const {FRANCHISES} = ENUMS.MEDIA_TYPE;

export const FranchisePage = ({intl: {formatMessage}}) => {
    const {guid} = useParams();
    return (
        <DocumentTitle title={formatMessage({id: 'franchisePage.title'})}>
            <StyledFranchiseSection>
                <MediaContainer guid={guid} mediaType={FRANCHISES} />
            </StyledFranchiseSection>
        </DocumentTitle>
    );
};

FranchisePage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(FranchisePage);
