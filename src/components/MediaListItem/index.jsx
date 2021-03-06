import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {GameListItem, CompanyListItem} from '../../types';
import {format} from 'date-fns';
import SkeletonLoader from '../SkeletonLoader';
import {
    StyledCard,
    StyledCardActionArea,
    StyledCardMediaContainer,
    StyledCardMedia,
    StyledCardContent,
    StyledCardHeading,
    StyledCardBody,
    StyledCardFooter,
} from './styles';
import {dateFormat} from '../../config';

export const MediaListItem = ({
    link,
    isLoading,
    item: {guid, name, deck, original_release_date, date_founded, image} = {},
}) => (
    <StyledCard>
        {isLoading ? (
            <StyledCardActionArea data-testid="item-loading">
                <StyledCardMediaContainer>
                    <SkeletonLoader variant="rect" style={{height: '100%'}} />
                </StyledCardMediaContainer>
                <StyledCardContent>
                    <StyledCardHeading variant="h5" component="h2" gutterBottom>
                        <SkeletonLoader variant="text" numLines={1} />
                    </StyledCardHeading>
                    <StyledCardBody variant="body1" gutterBottom>
                        <SkeletonLoader variant="text" numLines={3} />
                    </StyledCardBody>
                    <StyledCardFooter variant="body2">
                        <SkeletonLoader
                            variant="text"
                            numLines={1}
                            style={{width: '10rem'}}
                        />
                    </StyledCardFooter>
                </StyledCardContent>
            </StyledCardActionArea>
        ) : (
            <StyledCardActionArea
                component={Link}
                to={`${link}${guid}`}
                data-testid="item-loaded">
                <StyledCardMediaContainer>
                    <StyledCardMedia
                        aria-hidden={true}
                        title={name}
                        image={image?.screen_url}
                    />
                </StyledCardMediaContainer>
                <StyledCardContent>
                    <StyledCardHeading variant="h5" component="h2" gutterBottom>
                        {name}
                    </StyledCardHeading>
                    <StyledCardBody variant="body1" gutterBottom>
                        {deck}
                    </StyledCardBody>
                    <StyledCardFooter variant="body2">
                        {(original_release_date || date_founded) &&
                            format(
                                new Date(original_release_date || date_founded),
                                dateFormat
                            )}
                    </StyledCardFooter>
                </StyledCardContent>
            </StyledCardActionArea>
        )}
    </StyledCard>
);

MediaListItem.propTypes = {
    link: PropTypes.string,
    isLoading: PropTypes.bool,
    item: PropTypes.oneOfType([GameListItem, CompanyListItem]),
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.isLoading == nextProps.isLoading &&
    prevProps.item.guid == nextProps.item.guid;

export default React.memo(MediaListItem, isEqual);
