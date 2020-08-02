import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGamesSearchFilters, setCompaniesSearchFilters} from '../../redux/actions';
import {ENUMS} from '../../config';
import {getDefaultGamesFilter, getDefaultCompaniesFilter, objToFilterStr} from '../../utils';
import SearchBar from '../../components/SearchBar';

const {GAMES, COMPANIES} = ENUMS.MEDIA_TYPE;

const getDefaultFilters = (mediaType) => {
    let filters = {};
    if (mediaType == GAMES) {
        filters = getDefaultGamesFilter();
    } else if (mediaType == COMPANIES) {
        filters = getDefaultCompaniesFilter();
    }
    return filters;
}

export const MediaSearchContainer = ({mediaType, id, label, setSearchFilters}) => {
    const [searchStr, setSearchStr] = useState('');
    const debounceOnChange = useCallback(debounce((payload) => {
        setSearchFilters(payload)
    }, 2000), []);

    const onChange = (event) => {
        const defaultFilters = getDefaultFilters(mediaType);
        const {value} = event.target;
        setSearchStr(value);
        debounceOnChange({
            filter: objToFilterStr({
                ...defaultFilters,
                name: encodeURIComponent(value)
            })
        });
    };

    return <SearchBar
        id={id}
        label={label}
        value={searchStr}
        onChange={onChange}
    />;
}

export const mapDispatchToProps = (dispatch, {mediaType}) => {
    let actions = {};
    if (mediaType == GAMES) {
        actions = {
            ...actions,
            setSearchFilters: setGamesSearchFilters
        };
    } else if (mediaType == COMPANIES) {
        actions = {
            ...actions,
            setSearchFilters: setCompaniesSearchFilters
        };
    }
    return bindActionCreators(actions, dispatch);
}

MediaSearchContainer.propTypes = {
    mediaType: PropTypes.oneOf([GAMES, COMPANIES]),
    id: PropTypes.string,
    label: PropTypes.string,
    setSearchFilters: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(MediaSearchContainer);