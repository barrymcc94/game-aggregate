import React from 'react';
import throttle from 'lodash.throttle';
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

    componentDidMount() {
        const {
            id,
            containerType,
            clearState,
            disableScrollLoading,
        } = this.props;
        if (containerType !== FILTERED) {
            clearState({id}).then(() => {
                this.loadMore();
            });
        }
        if (!disableScrollLoading) {
            window.addEventListener('scroll', this.onScroll);
        }
    }

    componentWillUnmount() {
        const {disableScrollLoading} = this.props;
        if (!disableScrollLoading) {
            window.removeEventListener('scroll', this.onScroll);
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
        const {
            titleId,
            mediaType,
            items,
            isFetching,
            error,
            isLoading = false,
        } = this.props;
        return (
            <MediaList
                titleId={titleId}
                ref={this.mediaListRef}
                items={items}
                isLoading={isFetching || isLoading}
                error={error}
                link={`/${mediaType}/`}
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
    mediaType: PropTypes.oneOf([GAMES, COMPANIES, FRANCHISES]),
    containerType: PropTypes.oneOf([ALL, SEARCH, FILTERED]),
    disableScrollLoading: PropTypes.bool,
    allowEmptySearchFilter: PropTypes.bool,
    limit: PropTypes.number,
    isLoading: PropTypes.bool,
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
