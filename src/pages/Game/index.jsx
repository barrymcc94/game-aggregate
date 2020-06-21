import React from 'react';
import PropTypes from 'prop-types';
import {StyledGameArticle} from './styles';
import GameContainer from '../../containers/GameContainer';

const GamePage = ({match}) => (
    <StyledGameArticle>
        <GameContainer guid={match.params.guid}/>
    </StyledGameArticle>
);

GamePage.propTypes = {
    match: PropTypes.object,
}

export default GamePage;
