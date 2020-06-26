import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Game} from '../../types/game';
import Loader from '../Loader';
import {GameDetailsSection, DescriptionList, DescriptionWrapper, DescriptionLabel, DescriptionValue} from './styles';

const GameDetail = (id, defaultMessage, detailArr) => (
    Array.isArray(detailArr) && <DescriptionWrapper>
        <DescriptionLabel>
            <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </DescriptionLabel>
        {detailArr.map(({name, id}) => <DescriptionValue key={id}>{name}</DescriptionValue>)}
    </DescriptionWrapper>
);

export const GameDetails = ({game, isFetching}) => {
    const {franchises, genres, publishers, developers, themes, platforms} = game;
    return <Loader isLoading={isFetching}>
        <GameDetailsSection>
            <DescriptionList variant="body1" component="dl">
                {GameDetail('gameDetails.franchises', 'Franchises: ', franchises)}
                {GameDetail('gameDetails.genres', 'Genres: ', genres)}
                {GameDetail('gameDetails.publishers', 'Publishers: ', publishers)}
                {GameDetail('gameDetails.developers', 'Developers: ', developers)}
                {GameDetail('gameDetails.themes', 'Themes: ', themes)}
                {GameDetail('gameDetails.platforms', 'Platforms: ', platforms)}
            </DescriptionList>
        </GameDetailsSection>
    </Loader>;
};

GameDetails.propTypes = {
    game: Game,
    isFetching: PropTypes.bool,
}

export default injectIntl(GameDetails);