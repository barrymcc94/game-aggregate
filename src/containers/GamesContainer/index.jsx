import React from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import {GameListItem} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {objToFilterStr, getDefaultGamesFilter} from '../../utils';
import {fetchGames, clearGamesState} from '../../redux/actions';
import {selectGames} from '../../redux/selectors';
import GamesList from '../../components/GamesList';

export class GamesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.gameListRef = React.createRef();
    }

    loadMore = () => {
        const {meta, isFetching, fetchGames} = this.props;
        const {limit, offset, total, filters} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
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

    onScroll = throttle(() => {
        if (!this.gameListRef.current || window.pageYOffset < this.gameListRef.current.offsetHeight*0.8) {
            return;
        }
        this.loadMore();
    }, 2000);

    componentDidMount() {
        const {clearGamesState, containerType} = this.props;
        clearGamesState().then(() => {
            if (containerType == 'search') {
                return;
            }
            this.loadMore();
        })
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
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