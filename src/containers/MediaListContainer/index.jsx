import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchGames, fetchCompanies, fetchFranchises} from '../../redux/actions';
import {
    selectGames,
    selectCompanies,
    selectFranchises,
} from '../../redux/selectors';
import {ENUMS} from '../../config';
import {getDefaultListingFilters} from '../../utils';
import MediaList from '../../components/MediaList';
import InfiniteLoader from '../../components/InfiniteLoader';
import {usePrevious} from '../../hooks';

const {ALL, SEARCH, FILTERED} = ENUMS.CONTAINER_TYPE;
const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const MediaListContainer = ({
    id,
    title,
    isCarousel,
    mediaType,
    containerType,
    disableScrollLoading,
    limit,
    isLoading = false,
    buttonType,
    loadMoreText,
    items,
    error,
    isFetching,
    meta,
    fetchItems,
}) => {
    const listRef = useRef();
    const {offset, total} = meta;
    const prevId = usePrevious(id);

    const loadMore = (clearState) => {
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        const defaultQueryObj = getDefaultListingFilters(
            mediaType,
            limit ? {...meta, limit} : meta
        );
        const clearProps = clearState ? {offset: 0} : null;
        fetchItems({
            id,
            queryObj: {
                ...defaultQueryObj,
                ...meta.filters,
                ...(clearState
                    ? {
                          ...clearProps,
                          filter: defaultQueryObj.filter,
                      }
                    : null),
            },
            meta: {
                limit: defaultQueryObj.limit,
                ...clearProps,
            },
            clearState,
        });
    };

    useEffect(() => {
        if (containerType !== FILTERED) {
            loadMore(true);
        }
    }, []);

    useEffect(() => {
        if (
            containerType == FILTERED ||
            !meta.filters.filter ||
            prevId !== id
        ) {
            return;
        }
        loadMore();
    }, [meta.filters.filter]);

    const list = (
        <MediaList
            title={title}
            ref={listRef}
            isCarousel={isCarousel}
            items={items}
            total={total}
            isLoading={isFetching || isLoading}
            error={error}
            link={`/${mediaType}/`}
            buttonType={buttonType}
            loadMoreText={offset < total ? loadMoreText : ''}
            loadMore={loadMore}
        />
    );
    return !disableScrollLoading && !isCarousel ? (
        <InfiniteLoader listRef={listRef} loadMore={loadMore}>
            {list}
        </InfiniteLoader>
    ) : (
        list
    );
};

export const mapStateToProps = (state, {mediaType, id}) => {
    const defaultProps = {
        isFetching: false,
        error: false,
        meta: {filters: {}},
    };
    let {isFetching, error, meta} = state[mediaType] || defaultProps;
    let mediaState = {};
    if (mediaType == GAMES) {
        ({isFetching, error, meta} = state[mediaType][id] || defaultProps);
        mediaState = {items: selectGames(state, id)};
    } else if (mediaType == COMPANIES) {
        mediaState = {items: selectCompanies(state)};
    } else if (mediaType == FRANCHISES) {
        mediaState = {items: selectFranchises(state)};
    }
    return {
        ...mediaState,
        isFetching,
        error,
        meta,
    };
};

export const mapDispatchToProps = (dispatch, {mediaType}) => {
    let fetchItems = null;
    if (mediaType == GAMES) {
        fetchItems = fetchGames;
    } else if (mediaType == COMPANIES) {
        fetchItems = fetchCompanies;
    } else if (mediaType == FRANCHISES) {
        fetchItems = fetchFranchises;
    }
    return bindActionCreators({fetchItems}, dispatch);
};

MediaListContainer.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    isCarousel: PropTypes.bool,
    mediaType: PropTypes.oneOf([GAMES, COMPANIES, FRANCHISES]),
    containerType: PropTypes.oneOf([ALL, SEARCH, FILTERED]),
    disableScrollLoading: PropTypes.bool,
    limit: PropTypes.number,
    isLoading: PropTypes.bool,
    buttonType: PropTypes.string,
    loadMoreText: PropTypes.string,
    // controlled via redux
    items: PropTypes.array,
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    meta: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
        filters: PropTypes.object,
    }),
    fetchItems: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaListContainer);
