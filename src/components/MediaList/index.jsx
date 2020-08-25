import React from 'react';
import PropTypes from 'prop-types';
import MediaListItem from '../MediaListItem';
import ErrorMessage from '../ErrorMessage';
import {StyledGrid} from './styles';
import LoadMoreButton from './LoadMoreButton';
import ListHeading from './ListHeading';

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
            <ListHeading titleId={titleId} isLoading={isLoading} />
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
            {!error && !isLoading && !items.length ? (
                <ErrorMessage error={true} id="mediaList.emptyListMessage" />
            ) : null}
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
