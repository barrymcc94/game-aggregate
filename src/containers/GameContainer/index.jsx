import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Game as GameT} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {fetchGame} from '../../redux/actions';
import {selectGame} from '../../redux/selectors';
import Game from '../../components/Game';

export const GameContainer = ({
    guid,
    game = {},
    isFetching,
    error,
    fetchGame,
}) => {
    useEffect(() => {
        if (game && game.developers !== undefined) {
            return;
        }
        fetchGame({
            guid,
            queryObj: {
                ...defaultGbApiDefaults,
            },
        });
    }, []);

    return <Game game={game} isFetching={isFetching} error={error} />;
};

const mapStateToProps = (state, props) => {
    const {isFetching, error} = state.game;
    return {
        game: selectGame(state, props.guid),
        isFetching,
        error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchGame,
        },
        dispatch
    );
};

GameContainer.propTypes = {
    guid: PropTypes.string,
    game: GameT,
    fetchGame: PropTypes.func,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
