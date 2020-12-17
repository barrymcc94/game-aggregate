import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Game as GameT} from '../../types';
import DocumentTitle from '../DocumentTitle';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import GameDetails from '../GameDetails';
import GameFooter from '../GameFooter';

export const Game = ({game = {}, isFetching, error, intl: {formatMessage}}) => {
    if (error || (!isFetching && (!game || !game.guid))) {
        return <ErrorMessage error={error} id="game.error" />;
    }
    return (
        <DocumentTitle
            title={
                game.name ||
                formatMessage({id: 'gamePage.title', defaultMessage: 'Game'})
            }>
            <MediaHeader item={game} isLoading={isFetching} />
            <GameDetails game={game} isLoading={isFetching} />
            <GameFooter isLoading={isFetching} />
        </DocumentTitle>
    );
};

Game.propTypes = {
    intl: PropTypes.object,
    game: GameT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.isFetching == nextProps.isFetching &&
    prevProps.game.guid == nextProps.game.guid;
export default injectIntl(React.memo(Game, isEqual));
