import React from 'react';
import PropTypes from 'prop-types';
import {StyledGameSection} from './styles';

const GamePage = ({match}) => (
    <StyledGameSection>
        {match.params.guid}
    </StyledGameSection>
);

GamePage.propTypes = {
    match: PropTypes.object,
}

export default GamePage;
