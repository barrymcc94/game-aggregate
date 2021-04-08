import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Game} from '../../types/game';
import SkeletonLoader from '../SkeletonLoader';
import {
    GameDetailsSection,
    DescriptionList,
    DescriptionWrapper,
    DescriptionLabel,
    DescriptionValue,
} from './styles';
import {ENUMS} from '../../config';

const {COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

const GameDetail = ({text, detailArr, link}) =>
    Array.isArray(detailArr) ? (
        <DescriptionWrapper>
            <DescriptionLabel>{text}</DescriptionLabel>
            {detailArr.map(({name, id, api_detail_url}) => {
                let guid;
                try {
                    [, guid] = api_detail_url.match(/([^/]+)\/?$/);
                } catch (e) {
                    guid = null;
                }
                return (
                    <DescriptionValue key={id}>
                        {link && guid ? (
                            <Link component={RouterLink} to={`${link}${guid}`}>
                                {name}
                            </Link>
                        ) : (
                            name
                        )}
                    </DescriptionValue>
                );
            })}
        </DescriptionWrapper>
    ) : null;

export const GameDetails = ({game, isLoading}) => {
    const {
        franchises,
        genres,
        publishers,
        developers,
        themes,
        platforms,
    } = game;
    return (
        <GameDetailsSection>
            {isLoading ? (
                <DescriptionList variant="body1" component="div">
                    {[0, 0, 0, 0, 0, 0].map((_, i) => (
                        <DescriptionWrapper key={i}>
                            <SkeletonLoader variant="text" numLines={3} />
                        </DescriptionWrapper>
                    ))}
                </DescriptionList>
            ) : (
                <DescriptionList variant="body1" component="dl">
                    <GameDetail
                        text={
                            <FormattedMessage id={'gameDetails.franchises'} />
                        }
                        detailArr={franchises}
                        link={`/${FRANCHISES}/`}
                    />
                    <GameDetail
                        text={<FormattedMessage id={'gameDetails.genres'} />}
                        detailArr={genres}
                    />
                    <GameDetail
                        text={
                            <FormattedMessage id={'gameDetails.publishers'} />
                        }
                        detailArr={publishers}
                        link={`/${COMPANIES}/`}
                    />
                    <GameDetail
                        text={
                            <FormattedMessage id={'gameDetails.developers'} />
                        }
                        detailArr={developers}
                        link={`/${COMPANIES}/`}
                    />
                    <GameDetail
                        text={<FormattedMessage id={'gameDetails.themes'} />}
                        detailArr={themes}
                    />
                    <GameDetail
                        text={<FormattedMessage id={'gameDetails.platforms'} />}
                        detailArr={platforms}
                    />
                </DescriptionList>
            )}
        </GameDetailsSection>
    );
};

GameDetail.propTypes = {
    text: PropTypes.any,
    detailArr: PropTypes.array,
    link: PropTypes.string,
};

GameDetails.propTypes = {
    game: Game,
    isLoading: PropTypes.bool,
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.isLoading == nextProps.isLoading &&
    prevProps.game.guid == nextProps.game.guid;

export default React.memo(GameDetails, isEqual);
