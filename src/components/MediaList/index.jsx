import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import MediaListItem from '../MediaListItem';
import SkeletonLoader from '../SkeletonLoader';
import ErrorMessage from '../ErrorMessage';
import {StyledGrid} from './styles';
import LoadMoreButton from '../LoadMoreButton';

const itemsPlaceholder = new Array(12).fill(0);
export const MediaList = React.forwardRef(
    (
        {
            titleId,
            link,
            buttonType,
            items,
            isLoading,
            error,
            loadMoreId,
            onLoadMoreClick,
        },
        ref
    ) => (
        <>
            {titleId &&
                (isLoading ? (
                    <Typography variant="h5" component="h2" gutterBottom>
                        <SkeletonLoader variant="text" numLines={1} />
                    </Typography>
                ) : items.length || error ? (
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
            {isLoading || items.length ? (
                <LoadMoreButton
                    id={loadMoreId}
                    isLoading={isLoading}
                    error={error}
                    buttonType={buttonType}
                    link={link}
                    onClick={onLoadMoreClick}
                />
            ) : null}
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
    buttonType: PropTypes.string,
    loadMoreId: PropTypes.string,
    onLoadMoreClick: PropTypes.func,
};

export default MediaList;
