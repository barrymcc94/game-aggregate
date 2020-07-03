import React from 'react';
import PropTypes from 'prop-types';
import {SkeletonLoaderStyles} from './styles';

export const SkeletonLoader = ({
    variant,
    numLines=1,
    style={}
}) => {
    // if type is text or invalid option
    const arr = (new Array(numLines)).fill(0);
    return <SkeletonLoaderStyles style={style}>
        {arr.map((_, i) => (
            <React.Fragment key={i}>&nbsp;<br /></React.Fragment>
        ))}
    </SkeletonLoaderStyles>;
}

SkeletonLoader.propTypes = {
    variant: PropTypes.oneOf(['text', 'rect']),
    numLines: PropTypes.number,
    style: PropTypes.object,
}

export default SkeletonLoader;