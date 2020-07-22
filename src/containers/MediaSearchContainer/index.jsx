import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {objToFilterStr} from '../../utils';
import SearchBar from '../../components/SearchBar';

export const MediaSearchContainer = ({searchId, searchLabel, filter, setSearchFilters}) => {
    const [searchStr, setSearchStr] = useState('');
    const debounceOnChange = useCallback(debounce((payload) => {
        setSearchFilters(payload)
    }, 2000), []);

    const onChange = (event) => {
        const {value} = event.target;
        setSearchStr(value);
        debounceOnChange({
            filter: objToFilterStr({
                ...filter,
                name: encodeURIComponent(value)
            })
        });
    };

    return <SearchBar
        id={searchId}
        label={searchLabel}
        value={searchStr}
        onChange={onChange}
    />;
}

MediaSearchContainer.propTypes = {
    searchId: PropTypes.string,
    searchLabel: PropTypes.string,
    filter: PropTypes.object,
    setSearchFilters: PropTypes.func,
}

export default MediaSearchContainer;