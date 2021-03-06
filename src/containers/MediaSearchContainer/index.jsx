import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    setGamesSearchFilters,
    setCompaniesSearchFilters,
    setFranchisesSearchFilters,
} from '../../redux/actions';
import {ENUMS} from '../../config';
import {
    getDefaultGamesFilter,
    getDefaultCompaniesFilter,
    objToFilterStr,
} from '../../utils';
import SearchBar from '../../components/SearchBar';

const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

const getDefaultFilters = (mediaType) => {
    let filters = {};
    if (mediaType == GAMES) {
        filters = getDefaultGamesFilter();
    } else if (mediaType == COMPANIES) {
        filters = getDefaultCompaniesFilter();
    }
    return filters;
};

export const MediaSearchContainer = ({
    mediaType,
    id,
    label,
    setSearchFilters,
}) => {
    const [searchStr, setSearchStr] = useState('');
    const debounceOnChange = useCallback(
        debounce((payload) => {
            setSearchFilters(payload);
        }, 1000),
        []
    );

    const onChange = (event) => {
        const defaultFilters = getDefaultFilters(mediaType);
        const {value} = event.target;
        setSearchStr(value);
        debounceOnChange({
            id,
            filter: objToFilterStr({
                ...defaultFilters,
                name: encodeURIComponent(value),
            }),
        });
    };

    return (
        <SearchBar
            id={id}
            label={label}
            value={searchStr}
            onChange={onChange}
        />
    );
};

export const mapDispatchToProps = (dispatch, {mediaType}) => {
    let setSearchFilters = null;
    if (mediaType == GAMES) {
        setSearchFilters = setGamesSearchFilters;
    } else if (mediaType == COMPANIES) {
        setSearchFilters = setCompaniesSearchFilters;
    } else if (mediaType == FRANCHISES) {
        setSearchFilters = setFranchisesSearchFilters;
    }
    return bindActionCreators({setSearchFilters}, dispatch);
};

MediaSearchContainer.propTypes = {
    mediaType: PropTypes.oneOf([GAMES, COMPANIES, FRANCHISES]),
    id: PropTypes.string,
    label: PropTypes.string,
    setSearchFilters: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(MediaSearchContainer);
