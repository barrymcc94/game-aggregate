import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {StyledGamesListSection} from './styles';
import GamesContainer from '../../containers/GamesContainer';

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "homePage.title", defaultMessage: "Games"})}>
        <StyledGamesListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={"homePage.heading"} defaultMessage="Games" />
            </Typography>
            <GamesContainer containerType="all" />
        </StyledGamesListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
