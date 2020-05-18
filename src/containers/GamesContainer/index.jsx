import React from 'react';
import moment from 'moment/moment'
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import {Game} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {fetchGames} from '../../redux/actions';
import {selectGames} from '../../redux/selectors';
import GamesList from '../../components/GamesList';

export class GamesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.gameListRef = React.createRef();
    }

    loadMore = () => {
        const {meta, isFetching, fetchGames, filters} = this.props;
        const {limit, offset, total} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        const currentMoment = moment();
        const dateFormat = 'YYYY-M-D 00:00:00';
        const startDate = '';
        const endDate = currentMoment.subtract(1, 'day').format(dateFormat);
        fetchGames({
            ...defaultGbApiDefaults,
            sort: `original_release_date:desc`,
            filter: `original_release_date:${startDate}|${endDate}`,
            limit,
            offset,
            ...filters
        });
    }

    onScroll = throttle(() => {
        if (!this.gameListRef.current || window.pageYOffset < this.gameListRef.current.offsetHeight*0.8) {
            return;
        }
        this.loadMore();
    }, 2000);

    componentDidMount() {
        this.loadMore();
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        const {games, isFetching, error} = this.props;
        return <GamesList ref={this.gameListRef} games={games} isFetching={isFetching} error={error}/>;
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
    }, dispatch);
}

GamesContainer.propTypes = {
    filters: PropTypes.object.isRequired,
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