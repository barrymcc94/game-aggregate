import React from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {StyledGamesListSection} from './styles';
import GamesContainer from '../../containers/GamesContainer';

const HomePage = () => (
    <StyledGamesListSection>
        <Typography variant="h4" component="h1" gutterBottom>
            <FormattedMessage id={"homePage.title"} defaultMessage="Games" />
        </Typography>
        <GamesContainer containerType="all" />
    </StyledGamesListSection>
);

export default HomePage;
