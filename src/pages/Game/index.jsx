import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledGameSection} from './styles';

const {GAMES} = ENUMS.MEDIA_TYPE;

export const GamePage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'gamePage.title'})}>
        <StyledGameSection>
            <MediaContainer guid={match.params.guid} mediaType={GAMES} />
        </StyledGameSection>
    </DocumentTitle>
);

GamePage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(GamePage);
