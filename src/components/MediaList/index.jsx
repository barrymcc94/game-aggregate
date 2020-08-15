import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import MediaListItem from '../MediaListItem';
import SkeletonLoader from '../SkeletonLoader';
import ErrorMessage from '../ErrorMessage';
import {StyledGrid} from './styles';

const itemsPlaceholder = new Array(12).fill(0);
export const MediaList = React.forwardRef(
    ({titleId, link, items, isLoading, error}, ref) => (
        <>
            {titleId &&
                (isLoading ? (
                    <Typography variant="h5" component="h2" gutterBottom>
                        <SkeletonLoader variant="text" numLines={1} />
                    </Typography>
                ) : items.length ? (
                    <Typography variant="h5" component="h2" gutterBottom>
                        <FormattedMessage id={titleId} defaultMessage="Games" />
                    </Typography>
                ) : null)}
            <StyledGrid container spacing={2} alignItems="stretch" ref={ref}>
                {items.map((item) => (
                    <MediaListItem key={item.id} item={item} link={link} />
                ))}
                {isLoading &&
                    itemsPlaceholder.map((_, i) => (
                        <MediaListItem
                            key={i}
                            item={{}}
                            isLoading={isLoading}
                        />
                    ))}
            </StyledGrid>
            <ErrorMessage error={error} id="mediaList.error" />
        </>
    )
);

MediaList.displayName = 'MediaList';
MediaList.propTypes = {
    titleId: PropTypes.string,
    link: PropTypes.string,
    items: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default MediaList;
