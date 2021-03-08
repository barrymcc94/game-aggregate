import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    fetchGames,
    clearGamesState,
    fetchCompanies,
    clearCompaniesState,
    fetchFranchises,
    clearFranchisesState,
} from '../../redux/actions';
import {
    selectGames,
    selectCompanies,
    selectFranchises,
} from '../../redux/selectors';
import {ENUMS} from '../../config';
import {getDefaultListingFilters} from '../../utils';
import MediaList from '../../components/MediaList';
import InfinateLoader from '../../components/InfinateLoader';

const {ALL, SEARCH, FILTERED} = ENUMS.CONTAINER_TYPE;
const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export class MediaListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    loadMore = () => {
        const {id, mediaType, meta, limit, isFetching, fetchItems} = this.props;
        const {offset, total} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        const defaultQueryObj = getDefaultListingFilters(
            mediaType,
            limit ? {...meta, limit} : meta
        );
        fetchItems({
            id,
            queryObj: {
                ...defaultQueryObj,
                ...meta.filters,
            },
            meta: {
                limit: defaultQueryObj.limit,
            },
        });
    };

    componentDidMount() {
        const {id, containerType, clearState} = this.props;
        if (containerType !== FILTERED) {
            clearState({id}).then(() => {
                this.loadMore();
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            containerType,
            meta: {
                filters: {filter},
            },
        } = this.props;
        if (containerType == FILTERED) {
            return;
        }
        if (filter !== prevProps.meta.filters.filter) {
            this.loadMore();
        }
    }

    render() {
        const {
            title,
            mediaType,
            isCarousel,
            disableScrollLoading,
            items,
            isFetching,
            error,
            isLoading = false,
            buttonType,
            loadMoreText,
            meta: {total, offset},
        } = this.props;
        const list = (
            <MediaList
                title={title}
                ref={this.listRef}
                isCarousel={isCarousel}
                items={items}
                total={total}
                isLoading={isFetching || isLoading}
                error={error}
                link={`/${mediaType}/`}
                buttonType={buttonType}
                loadMoreText={offset < total ? loadMoreText : ''}
                loadMore={this.loadMore}
            />
        );
        return !disableScrollLoading && !isCarousel ? (
            <InfinateLoader listRef={this.listRef} loadMore={this.loadMore}>
                {list}
            </InfinateLoader>
        ) : (
            list
        );
    }
}

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
    let actions = {};
    if (mediaType == GAMES) {
        actions = {
            ...actions,
            fetchItems: fetchGames,
            clearState: clearGamesState,
        };
    } else if (mediaType == COMPANIES) {
        actions = {
            ...actions,
            fetchItems: fetchCompanies,
            clearState: clearCompaniesState,
        };
    } else if (mediaType == FRANCHISES) {
        actions = {
            ...actions,
            fetchItems: fetchFranchises,
            clearState: clearFranchisesState,
        };
    }
    return bindActionCreators(actions, dispatch);
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
    clearState: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaListContainer);
