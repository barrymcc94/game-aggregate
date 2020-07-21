import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MediaListItem from '../MediaListItem';
import ErrorMessage from '../ErrorMessage';

const itemsPlaceholder = new Array(12).fill(0);
export const MediaList = React.forwardRef(({link, items, isFetching, error}, ref) => (
    <React.Fragment>
        <Grid container spacing={2} alignItems="stretch" ref={ref}>
            {items.map((item) => (
                <MediaListItem key={item.id} item={item} link={link}/>
            ))}
            {isFetching && itemsPlaceholder.map((_, i) => (
                <MediaListItem key={i} item={{}} isLoading={isFetching} />
            ))}
        </Grid>
        <ErrorMessage error={error} id="mediaList.error" />
    </React.Fragment>
));

MediaList.displayName = 'MediaList';
MediaList.propTypes = {
    link: PropTypes.string,
    items: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    intl: PropTypes.object,
}

export default MediaList;