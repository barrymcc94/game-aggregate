import React from 'react';
import PropTypes from 'prop-types';
import {Game} from '../../types';
import {injectIntl} from 'react-intl';
import Grid from '@material-ui/core/Grid';
import GamesListItem from '../GamesListItem';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';

export const GamesList = ({games, isFetching, error}) => (
    <React.Fragment>
        <Grid container spacing={2} alignItems="stretch">
            {games.map((game) => <GamesListItem key={game.id} game={game} />)}
        </Grid>
        <Loader isLoading={isFetching} />
        <ErrorMessage error={error} id="gameslist.error" />
    </React.Fragment>
);

GamesList.propTypes = {
    games: PropTypes.arrayOf(Game),
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    intl: PropTypes.object,
}

export default injectIntl(GamesList);