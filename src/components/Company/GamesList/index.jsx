import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import MediaList from '../../MediaList';
import SkeletonLoader from '../../SkeletonLoader';
import {GameListItem} from '../../../types';
import {StyledHeading} from './styles';

export const GameList = ({fetchingGames, gamesList, error, titleId}) => (
    fetchingGames || (!fetchingGames && gamesList.length) ? <>
        <StyledHeading variant="h5" component="h2" gutterBottom>
            {fetchingGames
                ? <SkeletonLoader variant="text" numLines={1} />
                : <FormattedMessage id={titleId} defaultMessage="Related Games" />}
        </StyledHeading>
        <MediaList
            link={'/games/'}
            items={gamesList}
            isFetching={fetchingGames}
            error={error}
        />
    </> : null
)

GameList.propTypes = {
    intl: PropTypes.object,
    error: PropTypes.bool,
    fetchingGames: PropTypes.bool,
    gamesList: PropTypes.arrayOf(GameListItem),
    titleId: PropTypes.string,
}

export default injectIntl(GameList);