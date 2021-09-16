import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchGame, fetchCompany, fetchFranchise} from '../../redux/actions';
import {ENUMS} from '../../config';
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

const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const isItemLoaded = (mediaType, mediaItem) => {
    if (!mediaItem) {
        return false;
    }
    if (mediaType == GAMES) {
        return mediaItem.developers !== undefined;
    } else if (mediaType == COMPANIES) {
        return mediaItem.developed_games !== undefined;
    } else if (mediaType == FRANCHISES) {
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

    if (mediaType == GAMES) {
        return <Game game={item} isFetching={!isLoaded} error={error} />;
    } else if (mediaType == COMPANIES) {
        return <Company company={item} isFetching={!isLoaded} error={error} />;
    } else if (mediaType == FRANCHISES) {
        return (
            <Franchise franchise={item} isFetching={!isLoaded} error={error} />
        );
    }
    return null;
};

export const mapStateToProps = (state, {mediaType, guid}) => {
    let mediaState = {};
    if (mediaType == GAMES) {
        mediaState = {
            item: selectGame(state, guid),
        };
    } else if (mediaType == COMPANIES) {
        mediaState = {
            item: selectCompany(state, guid),
        };
    } else if (mediaType == FRANCHISES) {
        mediaState = {
            item: selectFranchise(state, guid),
        };
    }
    return {...mediaState};
};

export const mapDispatchToProps = (dispatch, {mediaType}) => {
    let actions = {};
    if (mediaType == GAMES) {
        actions = {...actions, fetchItem: fetchGame};
    } else if (mediaType == COMPANIES) {
        actions = {...actions, fetchItem: fetchCompany};
    } else if (mediaType == FRANCHISES) {
        actions = {...actions, fetchItem: fetchFranchise};
    }
    return bindActionCreators(actions, dispatch);
};

MediaContainer.propTypes = {
    mediaType: PropTypes.oneOf([GAMES, COMPANIES, FRANCHISES, null]),
    guid: PropTypes.string,
    item: PropTypes.oneOfType([GameT, CompanyT, FranchiseT]),
    fetchItem: PropTypes.func,
    intl: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);
