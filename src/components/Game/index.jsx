import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Game as GameT} from '../../types';
import DocumentTitle from '../DocumentTitle';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import GameDetails from '../GameDetails';
import GameFooter from '../GameFooter';
import AriaLoader from '../AriaLoader';

export const Game = ({game = {}, isFetching, error, intl: {formatMessage}}) => {
    if (error || (!isFetching && (!game || !game.guid))) {
        return (
            <ErrorMessage
                error={error}
                message={formatMessage({
                    id: 'game.error',
                })}
            />
        );
    }
    const {name = ''} = game;
    return (
        <DocumentTitle title={name || formatMessage({id: 'gamePage.title'})}>
            <AriaLoader
                isLoading={isFetching}
                loadingMessage={formatMessage(
                    {id: 'ariaLoader.loading'},
                    {name}
                )}
                loadedMessage={formatMessage({id: 'ariaLoader.loaded'}, {name})}
            />
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

export default injectIntl(Game);
