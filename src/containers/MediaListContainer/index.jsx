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
import {MEDIA_TYPES} from '../../config';
import {getDefaultListingFilters, objToFilterStr} from '../../utils';
import MediaList from '../../components/MediaList';
import InfiniteLoader from '../../components/InfiniteLoader';
import {usePrevious} from '../../hooks';

export const MediaListContainer = ({
    id,
    title,
    isCarousel,
    mediaType,
    preFiltered,
    disableScrollLoading,
    queryOverwrite,
    isLoading = false,
    buttonType,
    loadMoreText,
    items,
    error,
    isFetching,
    query,
    fetchItems,
}) => {
    const listRef = useRef();
    const {offset, limit, total} = query;
    const prevId = usePrevious(id);
    const filterStr = objToFilterStr(queryOverwrite?.filter);

    const loadMore = (clearState) => {
        if (isFetching || (!clearState && total > -1 && offset >= total)) {
            return;
        }
        const defaultQueryObj = getDefaultListingFilters(mediaType, {
            offset,
            limit,
        });
        fetchItems({
            id,
            query: {
                ...defaultQueryObj,
                ...(preFiltered
                    ? {filter: query.filter}
                    : {
                          ...queryOverwrite,
                          filter: {
                              ...defaultQueryObj?.filter,
                              ...queryOverwrite?.filter,
                          },
                      }),
                ...(clearState && {offset: 0}),
            },
            clearState,
        });
    };

    useEffect(() => {
        if (!preFiltered) {
            loadMore(true);
        }
    }, []);

    useEffect(() => {
        if (prevId === id) {
            loadMore(true);
        }
    }, [filterStr]);

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
        query: {filter: {}},
    };

    const mediaState = state[mediaType] || {};
    let {isFetching, error, query} = mediaState[id] || defaultProps;
    let items = [];
    if (mediaType == MEDIA_TYPES.GAMES) {
        items = selectGames(state, id);
    } else if (mediaType == MEDIA_TYPES.COMPANIES) {
        items = selectCompanies(state, id);
    } else if (mediaType == MEDIA_TYPES.FRANCHISES) {
        items = selectFranchises(state, id);
    }

    return {
        items,
        isFetching,
        error,
        query,
    };
};

export const mapDispatchToProps = (dispatch, {mediaType}) => {
    let fetchItems = null;
    if (mediaType == MEDIA_TYPES.GAMES) {
        fetchItems = fetchGames;
    } else if (mediaType == MEDIA_TYPES.COMPANIES) {
        fetchItems = fetchCompanies;
    } else if (mediaType == MEDIA_TYPES.FRANCHISES) {
        fetchItems = fetchFranchises;
    }
    return bindActionCreators({fetchItems}, dispatch);
};

MediaListContainer.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    isCarousel: PropTypes.bool,
    mediaType: PropTypes.oneOf([
        MEDIA_TYPES.GAMES,
        MEDIA_TYPES.COMPANIES,
        MEDIA_TYPES.FRANCHISES,
    ]),
    preFiltered: PropTypes.bool,
    disableScrollLoading: PropTypes.bool,
    queryOverwrite: PropTypes.object,
    isLoading: PropTypes.bool,
    buttonType: PropTypes.string,
    loadMoreText: PropTypes.string,
    // controlled via redux
    items: PropTypes.array,
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    query: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
        filter: PropTypes.object,
    }),
    fetchItems: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaListContainer);
