import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaSearchList from '../../components/MediaSearchList';
import {StyledMediaListSection} from './styles';

const {FRANCHISES} = ENUMS.MEDIA_TYPE;

export const FranchisesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'franchisesPage.title'})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id="franchisesPage.heading" />
            </Typography>
            <MediaSearchList
                mediaType={FRANCHISES}
                id="franchises"
                label={formatMessage({id: 'franchisesPage.searchLabel'})}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

FranchisesPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(FranchisesPage);
