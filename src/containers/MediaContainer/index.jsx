import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchGame, fetchCompany, fetchFranchise} from '../../redux/actions';
import {MEDIA_TYPES} from '../../config';
import {
    selectGame,
    selectCompany,
    selectFranchise,
} from '../../redux/selectors';
import {
    Game as GameT,
    Company as CompanyT,
    Franchise as FranchiseT,
} from '../../types';
import Game from '../../components/Game';
import Company from '../../components/Company';
import Franchise from '../../components/Franchise';

export const isItemLoaded = (mediaType, mediaItem) => {
    if (!mediaItem) {
        return false;
    }
    if (mediaType == MEDIA_TYPES.GAMES) {
        return mediaItem.developers !== undefined;
    } else if (mediaType == MEDIA_TYPES.COMPANIES) {
        return mediaItem.developed_games !== undefined;
    } else if (mediaType == MEDIA_TYPES.FRANCHISES) {
        return mediaItem.games !== undefined;
    }
    return false;
};

export const MediaContainer = ({mediaType, guid, item = {}, fetchItem}) => {
    const isLoaded = isItemLoaded(mediaType, item);
    const {error} = item;
    useEffect(() => {
        if (isLoaded || !guid) {
            return;
        }
        fetchItem({guid});
    }, []);

    if (mediaType == MEDIA_TYPES.GAMES) {
        return <Game game={item} isFetching={!isLoaded} error={error} />;
    } else if (mediaType == MEDIA_TYPES.COMPANIES) {
        return <Company company={item} isFetching={!isLoaded} error={error} />;
    } else if (mediaType == MEDIA_TYPES.FRANCHISES) {
        return (
            <Franchise franchise={item} isFetching={!isLoaded} error={error} />
        );
    }
    return null;
};

export const mapStateToProps = (state, {mediaType, guid}) => {
    let mediaState = {};
    if (mediaType == MEDIA_TYPES.GAMES) {
        mediaState = {
            item: selectGame(state, guid),
        };
    } else if (mediaType == MEDIA_TYPES.COMPANIES) {
        mediaState = {
            item: selectCompany(state, guid),
        };
    } else if (mediaType == MEDIA_TYPES.FRANCHISES) {
        mediaState = {
            item: selectFranchise(state, guid),
        };
    }
    return {...mediaState};
};

export const mapDispatchToProps = (dispatch, {mediaType}) => {
    let actions = {};
    if (mediaType == MEDIA_TYPES.GAMES) {
        actions = {...actions, fetchItem: fetchGame};
    } else if (mediaType == MEDIA_TYPES.COMPANIES) {
        actions = {...actions, fetchItem: fetchCompany};
    } else if (mediaType == MEDIA_TYPES.FRANCHISES) {
        actions = {...actions, fetchItem: fetchFranchise};
    }
    return bindActionCreators(actions, dispatch);
};

MediaContainer.propTypes = {
    mediaType: PropTypes.oneOf([
        MEDIA_TYPES.GAMES,
        MEDIA_TYPES.COMPANIES,
        MEDIA_TYPES.FRANCHISES,
        null,
    ]),
    guid: PropTypes.string,
    item: PropTypes.oneOfType([GameT, CompanyT, FranchiseT]),
    fetchItem: PropTypes.func,
    intl: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);
