import React from 'react';
import PropTypes from 'prop-types';
import {Game} from '../../types';
import {injectIntl} from 'react-intl';
import {StyledGrid, StyledCard, StyledCardActionArea, StyledCardMediaContainer, StyledCardMedia, StyledCardContent, StyledCardHeading, StyledCardBody, StyledCardFooter} from './styles';

export const GamesListItem = ({game: {name, deck, original_release_date, image}}) => (
    <StyledGrid item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
            <StyledCardActionArea>
                <StyledCardMediaContainer>
                    <StyledCardMedia title={name} image={image.screen_url} />
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
        </StyledCard>
    </StyledGrid>
);

GamesListItem.propTypes = {
    game: Game,
    intl: PropTypes.object,
}

export default injectIntl(GamesListItem);
