import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MediaListItem from '../MediaListItem';
import ErrorMessage from '../ErrorMessage';
import {StyledGrid} from './styles';
import LoadMoreButton from './LoadMoreButton';
import ListHeading from './ListHeading';
import MediaCarousel from '../MediaCarousel';
import {AriaLoader} from '../Loader';
import {FormattedMessage, injectIntl} from 'react-intl';

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
            intl: {formatMessage},
        },
        ref
    ) => {
        return (
            <>
                <AriaLoader isLoading={isLoading} />
                <ListHeading
                    titleId={titleId}
                    isLoading={isLoading && !items.length}
                />
                {isCarousel ? (
                    !error && (total || isLoading) ? (
                        <MediaCarousel
                            ref={ref}
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
                            link={link}
                            loadMore={loadMore}
                        />
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
                <ErrorMessage
                    error={error}
                    message={formatMessage({
                        id: 'mediaList.error',
                    })}
                />
                {!error && !isLoading && !items.length ? (
                    <Typography variant="body1" gutterBottom>
                        <FormattedMessage id="mediaList.emptyListMessage" />
                    </Typography>
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
    items: PropTypes.array,
    total: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    buttonType: PropTypes.string,
    loadMoreId: PropTypes.string,
    loadMore: PropTypes.func,
    intl: PropTypes.object,
};

export default injectIntl(MediaList, {forwardRef: true});
