import React from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
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

const {ALL, SEARCH, FILTERED} = ENUMS.CONTAINER_TYPE;
const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const hasFiltersSearchTerm = ({filter}) => {
    try {
        const matchingStrs = filter
            .split(',')
            .filter((str) => str.startsWith('name:'));
        return !!matchingStrs[0].replace('name:', '');
    } catch (e) {
        return false;
    }
};

export class MediaListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mediaListRef = React.createRef();
        this.loadMore = this.loadMore.bind(this);
        this.state = {wrapperWidth: 0};
    }

    loadMore = () => {
        const {
            id,
            mediaType,
            meta,
            limit,
            isFetching,
            containerType,
            fetchItems,
            clearState,
            allowEmptySearchFilter,
        } = this.props;
        const {offset, total, filters} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        if (
            !allowEmptySearchFilter &&
            containerType == SEARCH &&
            !hasFiltersSearchTerm(filters)
        ) {
            clearState({id});
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

    onScroll = throttle(() => {
        if (
            !this.mediaListRef.current ||
            window.innerHeight + window.pageYOffset <
                (this.mediaListRef.current.offsetHeight +
                    this.mediaListRef.current.offsetTop) *
                    0.8
        ) {
            return;
        }
        this.loadMore();
    }, 2000);

    onResize = debounce(() => {
        this.setState({
            wrapperWidth: this.mediaListRef?.current?.clientWidth || 0,
        });
    }, 250);

    componentDidMount() {
        const {
            id,
            containerType,
            clearState,
            disableScrollLoading,
            isCarousel,
        } = this.props;
        if (containerType !== FILTERED) {
            clearState({id}).then(() => {
                this.loadMore();
            });
        }
        if (!disableScrollLoading && !isCarousel) {
            window.addEventListener('scroll', this.onScroll);
        }
        if (isCarousel) {
            this.onResize();
            window.addEventListener('resize', this.onResize);
        }
    }

    componentWillUnmount() {
        const {disableScrollLoading, isCarousel} = this.props;
        if (!disableScrollLoading && !isCarousel) {
            window.removeEventListener('scroll', this.onScroll);
        }
        if (isCarousel) {
            window.removeEventListener('resize', this.onResize);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            id,
            containerType,
            meta: {
                filters: {filter},
            },
            clearState,
        } = this.props;
        if (containerType == FILTERED) {
            return;
        }
        if (containerType !== prevProps.containerType) {
            clearState({id});
        }
        if (filter !== prevProps.meta.filters.filter) {
            this.loadMore();
        }
    }

    render() {
        const {wrapperWidth} = this.state;
        const {
            titleId,
            mediaType,
            isCarousel,
            items,
            isFetching,
            error,
            isLoading = false,
            buttonType,
            loadMoreId,
            meta: {total, offset},
        } = this.props;
        return (
            <MediaList
                titleId={titleId}
                ref={this.mediaListRef}
                width={wrapperWidth}
                isCarousel={isCarousel}
                items={items}
                total={total}
                isLoading={isFetching || isLoading}
                error={error}
                link={`/${mediaType}/`}
                buttonType={buttonType}
                loadMoreId={offset < total ? loadMoreId : ''}
                loadMore={this.loadMore}
            />
        );
    }
}

const mapStateToProps = (state, {mediaType, id}) => {
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

const mapDispatchToProps = (dispatch, {mediaType}) => {
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
    titleId: PropTypes.string,
    isCarousel: PropTypes.bool,
    mediaType: PropTypes.oneOf([GAMES, COMPANIES, FRANCHISES]),
    containerType: PropTypes.oneOf([ALL, SEARCH, FILTERED]),
    disableScrollLoading: PropTypes.bool,
    allowEmptySearchFilter: PropTypes.bool,
    limit: PropTypes.number,
    isLoading: PropTypes.bool,
    buttonType: PropTypes.string,
    loadMoreId: PropTypes.string,
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
