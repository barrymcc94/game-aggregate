import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import MediaListItem from '../MediaListItem';
import ErrorMessage from '../ErrorMessage';
import {StyledGrid, StyledCarouselWrapper} from './styles';
import LoadMoreButton from './LoadMoreButton';
import ListHeading from './ListHeading';
import MediaCarousel from '../MediaCarousel';

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
        },
        ref
    ) => {
        const [width, setWidth] = useState(0);
        const onResize = useCallback(
            debounce(() => {
                setWidth(ref?.current?.clientWidth || 0);
            }, 250),
            []
        );

        useEffect(() => {
            if (isCarousel) {
                onResize();
                window.addEventListener('resize', onResize);
            }
            return () => {
                if (isCarousel) {
                    window.removeEventListener('resize', onResize);
                }
            };
        }, []);

        return (
            <>
                <ListHeading
                    titleId={titleId}
                    isLoading={isLoading && !items.length}
                />
                {isCarousel ? (
                    !error && (total || isLoading) ? (
                        <StyledCarouselWrapper ref={ref}>
                            <MediaCarousel
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
                                width={width}
                                link={link}
                                loadMore={loadMore}
                            />
                        </StyledCarouselWrapper>
                    ) : null
                ) : (
                    <StyledGrid
                        container
                        component="ul"
                        spacing={2}
                        alignItems="stretch"
                        ref={ref}>
                        <>
                            {items.map((item) => (
                                <StyledGrid
                                    component="li"
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
                                        component="li"
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
                    </StyledGrid>
                )}
                <ErrorMessage error={error} id="mediaList.error" />
                {!error && !isLoading && !items.length ? (
                    <ErrorMessage
                        error={true}
                        id="mediaList.emptyListMessage"
                    />
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
        );
    }
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
