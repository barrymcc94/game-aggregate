import React from 'react';
import PropTypes from 'prop-types';
import {Game as GameT} from '../../types/game';
import ErrorMessage from '../ErrorMessage';
import GameHeader from '../GameHeader';
import GameDetails from '../GameDetails';
import GameFooter from '../GameFooter';

export const Game = ({game, isFetching, error}) => {
    if (error || (!isFetching && (!game || !game.guid))) {
        return <ErrorMessage error={error} id="game.error" />;
    }
    return <>
        <GameHeader game={game} isLoading={isFetching} />
        <GameDetails game={game} isLoading={isFetching} />
        <GameFooter isLoading={isFetching} />
    </>;
}

Game.propTypes = {
    game: GameT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
}

export default Game;