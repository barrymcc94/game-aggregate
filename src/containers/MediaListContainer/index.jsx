import React from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchGames, clearGamesState, fetchCompanies, clearCompaniesState} from '../../redux/actions';
import {selectGames, selectCompanies} from '../../redux/selectors';
import {defaultGbApiDefaults, ENUMS} from '../../config';
import {objToFilterStr, getDefaultGamesFilter, getDefaultCompaniesFilter} from '../../utils';
import MediaList from '../../components/MediaList';

const {ALL, SEARCH} = ENUMS.CONTAINER_TYPE;
const {GAMES, COMPANIES} = ENUMS.MEDIA_TYPE;

export const hasFiltersSearchTerm = ({filter}) => {
    try {
        const matchingStrs = filter.split(',').filter(str => str.startsWith('name:'));
        return !!matchingStrs[0].replace('name:','')
    } catch (e) {
        return false;
    }
}

export const getDefaultFilters = (mediaType, meta) => {
    try {
        let defaultQueryObj = {
            ...defaultGbApiDefaults,
            limit: meta.limit,
            offset: meta.offset
        };
        if (mediaType == GAMES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                sort: 'original_release_date:desc',
                filter: objToFilterStr(getDefaultGamesFilter()),
            }
        } else if (mediaType == COMPANIES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                sort: 'date_founded:desc',
                filter: objToFilterStr(getDefaultCompaniesFilter()),
            }
        }
        return defaultQueryObj;
    } catch (e) {
        return {};
    }
}

export class MediaListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mediaListRef = React.createRef();
    }

    loadMore = () => {
        const {mediaType, meta, limit, isFetching, containerType, fetchItems, clearState, allowEmptySearchFilter} = this.props;
        const {offset, total, filters} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        if (!allowEmptySearchFilter && containerType == 'search' && !hasFiltersSearchTerm(filters)) {
            clearState();
            return;
        }
        const defaultQueryObj = getDefaultFilters(mediaType, limit ? {...meta, limit} : meta);
        fetchItems({
            queryObj: {
                ...defaultQueryObj,
                ...meta.filters
            },
            meta: {
                limit: defaultQueryObj.limit
            }
        });
    }

    onScroll = throttle(() => {
        if (!this.mediaListRef.current || window.innerHeight + window.pageYOffset < (this.mediaListRef.current.offsetHeight + this.mediaListRef.current.offsetTop) * 0.8) {
            return;
        }
        this.loadMore();
    }, 2000);

    componentDidMount() {
        const {clearState, disableScrollLoading} = this.props;
        clearState().then(() => {
            this.loadMore();
        });
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
        const {meta: {filters: {filter}}, containerType, clearState} = this.props;
        if (containerType !== prevProps.containerType) {
            clearState();
        }
        if (filter !== prevProps.meta.filters.filter) {
            this.loadMore();
        }
    }

    render() {
        const {mediaType, items, isFetching, error} = this.props;
        return <MediaList
            ref={this.mediaListRef}
            items={items}
            isFetching={isFetching}
            error={error}
            link={`/${mediaType}/`}
        />;
    }
}

const mapStateToProps = (state, {mediaType}) => {
    const {isFetching, error, meta} = state[mediaType] || {meta: {}};
    let mediaState = {};
    if (mediaType == GAMES) {
        mediaState = {
            items: selectGames(state),
        }
    } else if (mediaType == COMPANIES) {
        mediaState = {
            items: selectCompanies(state),
        }
    }
    return {
        ...mediaState,
        isFetching,
        error,
        meta,
    };
}

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
    }
    return bindActionCreators(actions, dispatch);
}

MediaListContainer.propTypes = {
    mediaType: PropTypes.oneOf([GAMES, COMPANIES]),
    containerType: PropTypes.oneOf([ALL, SEARCH]),
    disableScrollLoading: PropTypes.bool,
    allowEmptySearchFilter: PropTypes.bool,
    limit: PropTypes.number,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaListContainer);