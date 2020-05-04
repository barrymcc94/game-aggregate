import React, {useEffect} from 'react';
import moment from 'moment/moment'
import PropTypes from 'prop-types';
import {Game} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {fetchGames} from '../../redux/actions';
import {selectGames} from '../../redux/selectors';
import GamesList from '../../components/GamesList';

export const GamesContainer = ({games, isFetching, error, meta, fetchGames}) => {
    useEffect(() => {
        const currentMoment = moment();
        const dateFormat = 'YYYY-M-D 00:00:00';
        const endDate = currentMoment.subtract(1, 'day').format(dateFormat);
        const startDate = '';
        fetchGames({
            ...defaultGbApiDefaults,
            sort: `original_release_date:desc`,
            filter: `original_release_date:${startDate}|${endDate}`,
            limit: 100,
            offset: 0,
        });
    }, [])
    return <GamesList games={games} isFetching={isFetching} error={error} />;
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
    }, dispatch);
}

GamesContainer.propTypes = {
    games: PropTypes.arrayOf(Game),
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    meta: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
    }),
    fetchGames: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);