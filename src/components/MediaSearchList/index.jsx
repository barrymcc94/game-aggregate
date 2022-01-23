import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import SearchBar from '../SearchBar';
import MediaListContainer from '../../containers/MediaListContainer';

export const submitForm = (e) => {
    e.preventDefault();
};

export const MediaSearchList = ({id, mediaType, label}) => {
    const [value, setValue] = useState('');
    const [searchStr, setSearchVal] = useState('');

    const debounceOnChange = useCallback(
        debounce((val) => {
            setSearchVal(val);
        }, 1000),
        []
    );

    const onChange = (event) => {
        const {value} = event.target;
        setValue(value);
        debounceOnChange(value);
    };

    return (
        <>
            <form noValidate autoComplete="off" onSubmit={submitForm}>
                <SearchBar
                    id={id}
                    label={label}
                    value={value}
                    onChange={onChange}
                />
            </form>
            <MediaListContainer
                id="games"
                mediaType={mediaType}
                queryOverwrite={
                    searchStr
                        ? {filter: {name: encodeURIComponent(searchStr)}}
                        : {}
                }
            />
        </>
    );
};

MediaSearchList.propTypes = {
    id: PropTypes.string,
    mediaType: PropTypes.string,
    label: PropTypes.string,
};

export default MediaSearchList;
