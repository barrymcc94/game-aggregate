import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import debounce from 'lodash.debounce';
import {connect} from 'react-redux';
import {getDefaultGamesFilter, objToFilterStr} from '../../utils';
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