import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import MediaListContainer from '../../containers/MediaListContainer';
import {useDebounce} from '../../hooks';

export const submitForm = (e) => {
    e.preventDefault();
};

export const MediaSearchList = ({id, mediaType, label}) => {
    const [value, setValue] = useState('');
    const [searchStr, setSearchVal] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const debouncedValue = useDebounce(value, 1000);
    useEffect(() => {
        setSearchVal(debouncedValue);
    }, [debouncedValue]);

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
