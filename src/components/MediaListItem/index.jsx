import React from 'react';
import PropTypes from 'prop-types';
import {GameListItem} from '../../types';
import {injectIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import SkeletonLoader from '../SkeletonLoader';
import {StyledGrid, StyledCard, StyledCardActionArea, StyledCardMediaContainer, StyledCardMedia, StyledCardContent, StyledCardHeading, StyledCardBody, StyledCardFooter} from './styles';

export const MediaListItem = ({
    isLoading,
    game: {guid, name, deck, original_release_date, image}
}) => (
    <StyledGrid item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
        {isLoading
            ? <div>
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
            : <StyledCardActionArea component={Link} to={`/games/${guid}`}>
                    <StyledCardMediaContainer>
                        <StyledCardMedia title={name} image={image?.screen_url} />
                    </StyledCardMediaContainer>
                    <StyledCardContent>
                        <StyledCardHeading variant="h5" component="h2" gutterBottom>
                            {name}
                        </StyledCardHeading>
                        <StyledCardBody variant="body1" gutterBottom>
                            {deck}
                        </StyledCardBody>
                        <StyledCardFooter variant="body2">
                            {original_release_date}
                        </StyledCardFooter>
                    </StyledCardContent>
                </StyledCardActionArea>
            }
        </StyledCard>
    </StyledGrid>
);

MediaListItem.propTypes = {
    isLoading: PropTypes.bool,
    game: GameListItem,
    intl: PropTypes.object,
}

export default injectIntl(MediaListItem);
