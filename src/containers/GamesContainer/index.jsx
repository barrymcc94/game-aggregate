import React from 'react';
import PropTypes from 'prop-types';
import {GameListItem} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {objToFilterStr, getDefaultGamesFilter} from '../../utils';
import {fetchGames, clearGamesState} from '../../redux/actions';
import {selectGames} from '../../redux/selectors';
import MediaListContainer from '../MediaListContainer';

export const hasFiltersSearchTerm = ({filter}) => {
    try {
        const matchingStrs = filter.split(',').filter(str => str.startsWith('name:'));
        return !!matchingStrs[0].replace('name:','')
    } catch (e) {
        return false;
    }
}

export class GamesContainer extends React.Component {
    loadMore = () => {
        const {meta, isFetching, fetchGames, containerType, clearGamesState} = this.props;
        const {limit, offset, total, filters} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        if (containerType == 'search' && !hasFiltersSearchTerm(filters)) {
            clearGamesState();
            return;
        }
        fetchGames({
            queryObj: {
                ...defaultGbApiDefaults,
                sort: `original_release_date:desc`,
                filter: objToFilterStr({
                    ...getDefaultGamesFilter(),
                }),
                limit,
                offset,
                ...filters
            }
        });
    }

    componentDidMount() {
        const {clearGamesState, containerType} = this.props;
        clearGamesState().then(() => {
            if (containerType == 'search') {
                return;
            }
            this.loadMore();
        })
    }

    componentDidUpdate(prevProps) {
        const {meta: {filters: {filter}}, containerType, clearGamesState} = this.props;
        if (containerType !== prevProps.containerType) {
            clearGamesState();
        }
        if (filter !== prevProps.meta.filters.filter) {
            this.loadMore();
        }
    }

    render() {
        const {games, isFetching, error} = this.props;
        return <MediaListContainer
            items={games}
            isFetching={isFetching}
            error={error}
            loadMore={this.loadMore}
        />;
    }
}

const mapStateToProps = (state) => {
    const {isFetching, error, meta} = state.games;
    return {
        games: selectGames(state),
        isFetching,
        error,
        meta,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchGames,
        clearGamesState,
    }, dispatch);
}

GamesContainer.propTypes = {
    games: PropTypes.arrayOf(GameListItem),
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    meta: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
        filters: PropTypes.object,
    }),
    fetchGames: PropTypes.func,
    clearGamesState: PropTypes.func,
    containerType: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);