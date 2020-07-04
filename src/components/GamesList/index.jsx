import React from 'react';
import PropTypes from 'prop-types';
import {GameListItem} from '../../types';
import Grid from '@material-ui/core/Grid';
import GamesListItem from '../GamesListItem';
import ErrorMessage from '../ErrorMessage';

const gamesPlaceholder = new Array(12).fill(0);
export const GamesList = React.forwardRef(({games, isFetching, error}, ref) => (
    <React.Fragment>
        <Grid container spacing={2} alignItems="stretch" ref={ref}>
            {games.map((game) => (
                <GamesListItem key={game.id} game={game} />
            ))}
            {isFetching && gamesPlaceholder.map((_, i) => (
                <GamesListItem key={i} game={{}} isLoading={isFetching} />
            ))}
        </Grid>
        <ErrorMessage error={error} id="gameslist.error" />
    </React.Fragment>
));

GamesList.displayName = 'GamesList';
GamesList.propTypes = {
    games: PropTypes.arrayOf(GameListItem),
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    intl: PropTypes.object,
}

export default GamesList;