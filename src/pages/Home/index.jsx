import React from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import GamesContainer from '../../containers/GamesContainer';

const HomePage = () => (
    <section>
        <Typography variant="h4" component="h1" gutterBottom>
            <FormattedMessage id={"homePage.gamesTitle"} defaultMessage="Games" />
        </Typography>
        <GamesContainer/>
    </section>
);

export default HomePage;
