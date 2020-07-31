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

export const GamesContainer = ({containerType, allowEmptySearchFilter, disableLoadMore, games, isFetching, error, meta, clearGamesState, fetchGames}) => (
    <MediaListContainer
        link={'/games/'}
        containerType={containerType}
        allowEmptySearchFilter={allowEmptySearchFilter}
        disableScrollLoading={disableLoadMore}
        items={games}
        isFetching={isFetching}
        error={error}
        meta={meta}
        queryObj={{
            ...defaultGbApiDefaults,
            sort: `original_release_date:desc`,
            filter: objToFilterStr(getDefaultGamesFilter()),
            limit: meta.limit,
            offset: meta.offset
        }}
        fetchItems={fetchGames}
        clearState={clearGamesState}
    />
);

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
    containerType: PropTypes.oneOf(['all', 'search']),
    disableLoadMore: PropTypes.bool,
    allowEmptySearchFilter: PropTypes.bool,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);