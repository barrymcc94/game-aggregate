import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import debounce from 'lodash.debounce';
import {connect} from 'react-redux';
import {getDefaultGamesFilter, objToFilterStr} from '../../utils';
import {setGamesSearchFilters, clearGamesState} from '../../redux/actions';
import SearchBar from '../../components/SearchBar';

export const GamesSearchContainer = ({searchLabel, setGamesSearchFilters, clearGamesState}) => {
    const [searchStr, setSearchStr] = useState('');
    const debounceOnChange = useCallback(debounce((payload) => {
        setGamesSearchFilters(payload)
    }, 2000), []);

    const onChange = (event) => {
        const {value} = event.target;
        setSearchStr(value);
        debounceOnChange({
            filter: objToFilterStr({
                ...getDefaultGamesFilter(),
                name: encodeURIComponent(value),
            })
         });
    };

    return <SearchBar
        id="games_search"
        label={searchLabel}
        value={searchStr}
        onChange={onChange}
    />;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setGamesSearchFilters,
        clearGamesState,
    }, dispatch);
}

GamesSearchContainer.propTypes = {
    searchLabel: PropTypes.string,
    setGamesSearchFilters: PropTypes.func,
    clearGamesState: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(GamesSearchContainer);