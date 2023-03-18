import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {MEDIA_TYPES} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaSearchList from '../../components/MediaSearchList';
import {StyledMediaListSection} from './styles';

export const GamesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'gamesPage.title'})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id="gamesPage.heading" />
            </Typography>
            <MediaSearchList
                mediaType={MEDIA_TYPES.GAMES}
                id="games"
                label={formatMessage({id: 'gamesPage.searchLabel'})}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

GamesPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(GamesPage);
