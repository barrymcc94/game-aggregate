import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Game} from '../../types/game';
import SkeletonLoader from '../SkeletonLoader';
import {GameDetailsSection, DescriptionList, DescriptionWrapper, DescriptionLabel, DescriptionValue} from './styles';

const GameDetail = (id, defaultMessage, detailArr) => (
    Array.isArray(detailArr) && <DescriptionWrapper>
        <DescriptionLabel>
            <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </DescriptionLabel>
        {detailArr.map(({name, id}) => <DescriptionValue key={id}>{name}</DescriptionValue>)}
    </DescriptionWrapper>
);

export const GameDetails = ({game, isLoading}) => {
    const {franchises, genres, publishers, developers, themes, platforms} = game;
    return <GameDetailsSection>
        {isLoading
            ? <DescriptionList variant="body1" component="div">
                {[0, 0, 0, 0, 0, 0].map((_, i) => <DescriptionWrapper key={i}>
                    <SkeletonLoader variant="text" numLines={3} />
                </DescriptionWrapper>)}
            </DescriptionList>
            : <DescriptionList variant="body1" component="dl">
                    {GameDetail('gameDetails.franchises', 'Franchises: ', franchises)}
                    {GameDetail('gameDetails.genres', 'Genres: ', genres)}
                    {GameDetail('gameDetails.publishers', 'Publishers: ', publishers)}
                    {GameDetail('gameDetails.developers', 'Developers: ', developers)}
                    {GameDetail('gameDetails.themes', 'Themes: ', themes)}
                    {GameDetail('gameDetails.platforms', 'Platforms: ', platforms)}
            </DescriptionList>}
    </GameDetailsSection>
};

GameDetails.propTypes = {
    game: Game,
    isLoading: PropTypes.bool,
}

export default injectIntl(GameDetails);