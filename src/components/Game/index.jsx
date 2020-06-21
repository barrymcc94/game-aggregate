import React from 'react';
import PropTypes from 'prop-types';
import {Game as GameT} from '../../types/game';
import ErrorMessage from '../ErrorMessage';

export const Game = ({game, isFetching, error}) => {
    if (error || (!isFetching && (!game || !game.guid))) {
        return <ErrorMessage error={error} id="game.error" />;
    }
    return <>
        {game.guid}
    </>;
}

Game.propTypes = {
    game: GameT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
}

export default Game;