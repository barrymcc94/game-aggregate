import React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import {FormattedMessage, injectIntl} from 'react-intl';
import {format} from 'date-fns';
import {dateFormat} from '../../config';
import {Game, Company} from '../../types';
import SkeletonLoader from '../SkeletonLoader';
import {
    PosterImg,
    StyledMediaHeader,
    TitleContent,
    HeadingFooter,
    FooterItem,
    GameName,
    GameText,
    DescriptionList,
    DescriptionLabel,
    DescriptionValue,
    PosterImgLoader,
} from './styles';

export const MediaHeader = ({item, isLoading, intl}) => {
    const {
        name,
        deck,
        image,
        aliases,
        site_detail_url,
        original_release_date,
        date_founded,
    } = item;
    const aliasesContent = aliases
        ? aliases
              .split('\n')
              .map((alias) => (
                  <DescriptionValue key={alias}>{alias}</DescriptionValue>
              ))
        : null;
    const {small_url = ''} = image || {};
    if (isLoading) {
        return (
            <StyledMediaHeader data-testid="media-header">
                <PosterImgLoader />
                <TitleContent>
                    <GameName variant="h5" component="h1" gutterBottom>
                        <SkeletonLoader variant="text" numLines={1} />
                    </GameName>
                    <GameText variant="body1">
                        <SkeletonLoader variant="text" numLines={3} />
                    </GameText>
                    {(aliasesContent || isLoading) && (
                        <DescriptionList variant="body1">
                            <SkeletonLoader
                                variant="text"
                                numLines={3}
                                style={{width: '50%'}}
                            />
                        </DescriptionList>
                    )}
                    <HeadingFooter variant="subtitle2" component="div">
                        <SkeletonLoader
                            variant="text"
                            numLines={1}
                            style={{width: '47.5%'}}
                        />
                        <SkeletonLoader
                            variant="text"
                            numLines={1}
                            style={{width: '47.5%'}}
                        />
                    </HeadingFooter>
                </TitleContent>
            </StyledMediaHeader>
        );
    }
    return (
        <StyledMediaHeader data-testid="media-header">
            <PosterImg
                src={small_url}
                alt={intl.formatMessage({id: 'mediaHeader.posterAlt'})}
            />
            <TitleContent>
                <GameName variant="h5" component="h1" gutterBottom>
                    {name}
                </GameName>
                <GameText variant="body1">{deck}</GameText>
                {aliasesContent && (
                    <DescriptionList variant="body1" component="dl">
                        <DescriptionLabel>
                            <FormattedMessage id="mediaHeader.aliases" />
                        </DescriptionLabel>
                        {aliasesContent}
                    </DescriptionList>
                )}
                <HeadingFooter variant="subtitle2" component="div">
                    <FooterItem>
                        <Link href={site_detail_url} color="primary">
                            <FormattedMessage id="mediaHeader.viewOnSite" />
                        </Link>
                    </FooterItem>
                    {original_release_date && (
                        <FooterItem>
                            <FormattedMessage
                                id="mediaHeader.released"
                                values={{
                                    date: format(
                                        new Date(original_release_date),
                                        dateFormat
                                    ),
                                }}
                            />
                        </FooterItem>
                    )}
                    {date_founded && (
                        <FooterItem>
                            <FormattedMessage
                                id="mediaHeader.founded"
                                values={{
                                    date: format(
                                        new Date(date_founded),
                                        dateFormat
                                    ),
                                }}
                            />
                        </FooterItem>
                    )}
                </HeadingFooter>
            </TitleContent>
        </StyledMediaHeader>
    );
};

MediaHeader.propTypes = {
    item: PropTypes.oneOfType([Game, Company]),
    isLoading: PropTypes.bool,
    intl: PropTypes.any,
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.isLoading == nextProps.isLoading &&
    prevProps.item.guid == nextProps.item.guid;

export default injectIntl(React.memo(MediaHeader, isEqual));
