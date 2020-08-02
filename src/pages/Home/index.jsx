import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import {StyledMediaListSection} from './styles';
import MediaListContainer from '../../containers/MediaListContainer';

const {GAMES} = ENUMS.MEDIA_TYPE;
const {ALL} = ENUMS.CONTAINER_TYPE;

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "homePage.title", defaultMessage: "Games"})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={"homePage.heading"} defaultMessage="Games" />
            </Typography>
            <MediaListContainer mediaType={GAMES} containerType={ALL} allowEmptySearchFilter={true} disableScrollLoading={false} />
        </StyledMediaListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
