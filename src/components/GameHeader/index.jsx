import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import {Game} from '../../types/game';
import Loader from '../Loader';
import {PosterImg, StyledGameHeader, TitleContent, HeadingFooter, FooterItem, GameName, GameText, DescriptionList, DescriptionLabel, DescriptionValue} from './styles';

export const GameHeader = ({game, isFetching}) => {
    const {name, deck, image, aliases, site_detail_url, original_release_date} = game;
    const aliasesArr = aliases
        ? aliases.split('\n').map(alias => <DescriptionValue key={alias}>{alias}</DescriptionValue>)
        : null;
    const {small_url} = image || {};
    return <Loader isLoading={isFetching}>
        <StyledGameHeader>
            <PosterImg src={small_url} />
            <TitleContent>
                <GameName variant="h5" component="h1" gutterBottom>
                    {name}
                </GameName>
                <GameText variant="body1">
                    {deck}
                </GameText>
                {aliasesArr && <DescriptionList variant="body1" component="dl">
                    <DescriptionLabel>
                        <FormattedHTMLMessage id="gameHeader.aliases" defaultMessage={`Also Known as: `} />
                    </DescriptionLabel>
                    {aliasesArr}
                </DescriptionList>}
                <HeadingFooter variant="subtitle2" component="div">
                    <FooterItem>
                        <Link href={site_detail_url}>
                            <FormattedMessage id="gameHeader.viewOnSite" defaultMessage="View on GiantBomb" />
                        </Link>
                    </FooterItem>
                    <FooterItem>
                        <FormattedMessage id="gameHeader.released" defaultMessage={`Released: ${original_release_date}`} values={{date: original_release_date}} />
                    </FooterItem>
                </HeadingFooter>
            </TitleContent>
        </StyledGameHeader>
    </Loader>
}

GameHeader.propTypes = {
    game: Game,
    isFetching: PropTypes.bool,
}

export default injectIntl(GameHeader);