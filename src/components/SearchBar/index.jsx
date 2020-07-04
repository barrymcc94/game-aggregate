import React from 'react';
import PropTypes from 'prop-types';
import {StyledTextField} from './styles';

const SearchBar = ({id, label, value, onChange}) => (
    <StyledTextField
        variant="outlined"
        id={id}
        label={label}
        value={value}
        onChange={onChange}
    />
);

SearchBar.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default SearchBar;
