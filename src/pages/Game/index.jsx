import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import {StyledGameArticle} from './styles';
import MediaContainer from '../../containers/MediaContainer';

const {GAMES} = ENUMS.MEDIA_TYPE;

export const GamePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle
        title={formatMessage({id: 'gamePage.title', defaultMessage: 'Game'})}>
        <StyledGameArticle>
            <MediaContainer guid={match.params.guid} mediaType={GAMES} />
        </StyledGameArticle>
    </DocumentTitle>
);

GamePage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(GamePage);
