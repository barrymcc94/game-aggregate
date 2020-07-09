import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {StyledGameArticle} from './styles';
import GameContainer from '../../containers/GameContainer';

export const GamePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "gamePage.title", defaultMessage: "Game"})}>
        <StyledGameArticle>
            <GameContainer guid={match.params.guid}/>
        </StyledGameArticle>
    </DocumentTitle>
);

GamePage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
}

export default injectIntl(GamePage);
