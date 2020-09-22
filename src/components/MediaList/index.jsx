import React from 'react';
import PropTypes from 'prop-types';
import MediaListItem from '../MediaListItem';
import ErrorMessage from '../ErrorMessage';
import {StyledGrid} from './styles';
import LoadMoreButton from './LoadMoreButton';
import ListHeading from './ListHeading';
import Carousel from '../Carousel';

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
            loadMore,
            total,
            isCarousel,
            width,
        },
        ref
    ) => (
        <>
            <ListHeading
                titleId={titleId}
                isLoading={isLoading && !items.length}
            />
            <StyledGrid
                container
                spacing={2}
                alignItems="stretch"
                ref={ref}
                style={{margin: 0, marginBottom: '1rem', width: '100%'}}>
                {isCarousel ? (
                    <Carousel
                        items={
                            isLoading && !items.length
                                ? itemsPlaceholder
                                : items
                        }
                        total={
                            isLoading && !items.length
                                ? itemsPlaceholder.length
                                : total
                        }
                        error={error}
                        width={width}
                        link={link}
                        loadMore={loadMore}
                        isLoading={isLoading}
                    />
                ) : (
                    <>
                        {items.map((item) => (
                            <StyledGrid
                                key={item.id}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}>
                                <MediaListItem item={item} link={link} />
                            </StyledGrid>
                        ))}
                        {isLoading &&
                            itemsPlaceholder.map((_, i) => (
                                <StyledGrid
                                    key={i}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}>
                                    <MediaListItem
                                        item={{}}
                                        isLoading={isLoading}
                                    />
                                </StyledGrid>
                            ))}
                    </>
                )}
            </StyledGrid>
            <ErrorMessage error={error} id="mediaList.error" />
            {!error && !isLoading && !items.length ? (
                <ErrorMessage error={true} id="mediaList.emptyListMessage" />
            ) : null}
            {(isLoading || items.length) && !isCarousel ? (
                <LoadMoreButton
                    id={loadMoreId}
                    isLoading={isLoading}
                    error={error}
                    buttonType={buttonType}
                    link={link}
                    onClick={loadMore}
                />
            ) : null}
        </>
    )
);

MediaList.displayName = 'MediaList';
MediaList.propTypes = {
    titleId: PropTypes.string,
    link: PropTypes.string,
    isCarousel: PropTypes.bool,
    width: PropTypes.number,
    items: PropTypes.array,
    total: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    buttonType: PropTypes.string,
    loadMoreId: PropTypes.string,
    loadMore: PropTypes.func,
};

export default MediaList;
