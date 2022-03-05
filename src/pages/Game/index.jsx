import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {useParams} from 'react-router-dom';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledGameSection} from './styles';

const {GAMES} = ENUMS.MEDIA_TYPE;

export const GamePage = ({intl: {formatMessage}}) => {
    const {guid} = useParams();
    return (
        <DocumentTitle title={formatMessage({id: 'gamePage.title'})}>
            <StyledGameSection>
                <MediaContainer guid={guid} mediaType={GAMES} />
            </StyledGameSection>
        </DocumentTitle>
    );
};

GamePage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(GamePage);
