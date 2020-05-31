import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import GamesContainer from '../../containers/GamesContainer';
import GamesSearchContainer from '../../containers/GamesSearchContainer';
import {StyledGamesListSection} from './styles';

export const SearchPage = ({intl: {formatMessage}}) => (
    <StyledGamesListSection>
        <Typography variant="h4" component="h1" gutterBottom>
            <FormattedMessage id="homePage.gamesTitle" defaultMessage="Games" />
        </Typography>
        <form noValidate autoComplete="off">
            <GamesSearchContainer searchLabel={formatMessage({id: 'searchPage.searchLabel'})} />
        </form>
        <GamesContainer containerType="search" />
    </StyledGamesListSection>
)

SearchPage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(SearchPage);
