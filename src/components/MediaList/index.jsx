import React from 'react';
import PropTypes from 'prop-types';
import {GameListItem} from '../../types';
import Grid from '@material-ui/core/Grid';
import MediaListItem from '../MediaListItem';
import ErrorMessage from '../ErrorMessage';

const gamesPlaceholder = new Array(12).fill(0);
export const MediaList = React.forwardRef(({games, isFetching, error}, ref) => (
    <React.Fragment>
        <Grid container spacing={2} alignItems="stretch" ref={ref}>
            {games.map((game) => (
                <MediaListItem key={game.id} game={game} />
            ))}
            {isFetching && gamesPlaceholder.map((_, i) => (
                <MediaListItem key={i} game={{}} isLoading={isFetching} />
            ))}
        </Grid>
        <ErrorMessage error={error} id="mediaList.error" />
    </React.Fragment>
));

MediaList.displayName = 'MediaList';
MediaList.propTypes = {
    games: PropTypes.arrayOf(GameListItem),
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    intl: PropTypes.object,
}

export default MediaList;