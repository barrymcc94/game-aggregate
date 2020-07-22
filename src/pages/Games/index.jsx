import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import GamesContainer from '../../containers/GamesContainer';
import GamesSearchContainer from '../../containers/GamesSearchContainer';
import {StyledMediaListSection} from './styles';

export const submitForm = (e) => {
    e.preventDefault();
}

export const GamesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "gamesPage.title", defaultMessage: "Search"})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id="gamesPage.title" defaultMessage="Games" />
            </Typography>
            <form noValidate autoComplete="off" onSubmit={submitForm}>
                <GamesSearchContainer searchLabel={formatMessage({id: 'gamesPage.searchLabel', defaultMessage: "Search"})} />
            </form>
            <GamesContainer containerType="search" />
        </StyledMediaListSection>
    </DocumentTitle>
)

GamesPage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(GamesPage);
