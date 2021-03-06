import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaListContainer from '../../containers/MediaListContainer';
import MediaSearchContainer from '../../containers/MediaSearchContainer';
import {StyledMediaListSection} from './styles';

const {GAMES} = ENUMS.MEDIA_TYPE;
const {SEARCH} = ENUMS.CONTAINER_TYPE;

export const submitForm = (e) => {
    e.preventDefault();
};

export const GamesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'gamesPage.title'})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id="gamesPage.heading" />
            </Typography>
            <form noValidate autoComplete="off" onSubmit={submitForm}>
                <MediaSearchContainer
                    mediaType={GAMES}
                    id="games"
                    label={formatMessage({id: 'gamesPage.searchLabel'})}
                />
            </form>
            <MediaListContainer
                id="games"
                mediaType={GAMES}
                containerType={SEARCH}
                disableScrollLoading={false}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

GamesPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(GamesPage);
