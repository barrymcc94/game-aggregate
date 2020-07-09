import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import GamesContainer from '../../containers/GamesContainer';
import GamesSearchContainer from '../../containers/GamesSearchContainer';
import {StyledGamesListSection} from './styles';

export const SearchPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "searchPage.title", defaultMessage: "Search"})}>
        <StyledGamesListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id="searchPage.title" defaultMessage="Games" />
            </Typography>
            <form noValidate autoComplete="off">
                <GamesSearchContainer searchLabel={formatMessage({id: 'searchPage.searchLabel', defaultMessage: "Search"})} />
            </form>
            <GamesContainer containerType="search" />
        </StyledGamesListSection>
    </DocumentTitle>
)

SearchPage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(SearchPage);
