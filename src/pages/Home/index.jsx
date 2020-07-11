import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {StyledMediaListSection} from './styles';
import GamesContainer from '../../containers/GamesContainer';

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "homePage.title", defaultMessage: "Games"})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={"homePage.heading"} defaultMessage="Games" />
            </Typography>
            <GamesContainer containerType="all" />
        </StyledMediaListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
