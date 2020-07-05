import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import {Game} from '../../types/game';
import SkeletonLoader from '../SkeletonLoader';
import {PosterImg, StyledGameHeader, TitleContent, HeadingFooter, FooterItem, GameName, GameText, DescriptionList, DescriptionLabel, DescriptionValue} from './styles';
import {PosterImgLoader} from './styles';

export const GameHeader = ({game, isLoading, intl}) => {
    const {name, deck, image, aliases, site_detail_url, original_release_date} = game;
    const aliasesContent = aliases
        ? aliases.split('\n').map(alias => <DescriptionValue key={alias}>{alias}</DescriptionValue>)
        : null;
    const {small_url = ''} = image || {};
    if (isLoading) {
        return <StyledGameHeader>
            <PosterImgLoader />
            <TitleContent>
                <GameName variant="h5" component="h1" gutterBottom>
                    <SkeletonLoader variant="text" numLines={1} />
                </GameName>
                <GameText variant="body1">
                    <SkeletonLoader variant="text" numLines={3} />
                </GameText>
                {(aliasesContent || isLoading) && <DescriptionList variant="body1">
                    <SkeletonLoader variant="text" numLines={3} style={{width: '50%'}} />
                </DescriptionList>}
                <HeadingFooter variant="subtitle2" component="div">
                    <SkeletonLoader variant="text" numLines={1} style={{width: '47.5%'}} />
                    <SkeletonLoader variant="text" numLines={1} style={{width: '47.5%'}} />
                </HeadingFooter>
            </TitleContent>
        </StyledGameHeader>
    }
    return <StyledGameHeader>
        <PosterImg
            src={small_url}
            alt={intl.formatMessage({id: 'gameHeader.posterAlt'})}
        />
        <TitleContent>
            <GameName variant="h5" component="h1" gutterBottom>
                {name}
            </GameName>
            <GameText variant="body1">
                {deck}
            </GameText>
            {aliasesContent && <DescriptionList variant="body1" component="dl">
                <DescriptionLabel>
                    <FormattedHTMLMessage
                        id="gameHeader.aliases"
                        defaultMessage={`Also Known as: `}
                    />
                </DescriptionLabel>
                {aliasesContent}
            </DescriptionList>}
            <HeadingFooter variant="subtitle2" component="div">
                <FooterItem>
                    <Link href={site_detail_url}>
                        <FormattedMessage
                            id="gameHeader.viewOnSite"
                            defaultMessage="View on GiantBomb"
                        />
                    </Link>
                </FooterItem>
                <FooterItem>
                    <FormattedMessage
                        id="gameHeader.released"
                        defaultMessage={`Released: ${original_release_date}`}
                        values={{date: original_release_date || '-'}}
                    />
                </FooterItem>
            </HeadingFooter>
        </TitleContent>
    </StyledGameHeader>;
}

GameHeader.propTypes = {
    game: Game,
    isLoading: PropTypes.bool,
    intl: PropTypes.any
}

export default injectIntl(GameHeader);