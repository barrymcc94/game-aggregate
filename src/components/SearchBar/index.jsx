import React from 'react';
import PropTypes from 'prop-types';
import {StyledTextField} from './styles';

const SearchBar = ({searchLabel, value, onChange}) => (
    <StyledTextField label={searchLabel} variant="outlined" value={value} onChange={onChange} />
);

SearchBar.propTypes = {
    searchLabel: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default SearchBar;
