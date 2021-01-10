import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {GameListItem, CompanyListItem} from '../../types';
import {Link} from 'react-router-dom';
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

export const MediaListItem = ({
    link,
    isLoading,
    item: {guid, name, deck, original_release_date, date_founded, image},
}) => (
    <StyledCard>
        {isLoading ? (
            <div>
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
            </div>
        ) : (
            <StyledCardActionArea component={Link} to={`${link}${guid}`}>
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
                            moment(
                                original_release_date || date_founded
                            ).format('YYYY-M-D')}
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
