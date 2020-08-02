import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {StyledMediaListSection} from './styles';
import MediaListContainer from '../../containers/MediaListContainer';

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "homePage.title", defaultMessage: "Games"})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={"homePage.heading"} defaultMessage="Games" />
            </Typography>
            <MediaListContainer mediaType="games" containerType="all" allowEmptySearchFilter={true} disableScrollLoading={false} />
        </StyledMediaListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
