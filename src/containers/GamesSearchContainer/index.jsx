import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getDefaultGamesFilter} from '../../utils';
import {setGamesSearchFilters} from '../../redux/actions';
import MediaSearchContainer from '../MediaSearchContainer';

export const GamesSearchContainer = ({searchLabel, setGamesSearchFilters}) => (
    <MediaSearchContainer
        searchId="games_search"
        searchLabel={searchLabel}
        filter={getDefaultGamesFilter()}
        setSearchFilters={setGamesSearchFilters}
    />
);

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setGamesSearchFilters
    }, dispatch);
}

GamesSearchContainer.propTypes = {
    searchLabel: PropTypes.string,
    setGamesSearchFilters: PropTypes.func
}

export default connect(null, mapDispatchToProps)(GamesSearchContainer);