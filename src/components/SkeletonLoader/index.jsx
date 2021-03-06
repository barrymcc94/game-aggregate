import React from 'react';
import PropTypes from 'prop-types';
import {StyledSkeletonLoader} from './styles';

export const SkeletonLoader = ({variant, numLines = 1, style = {}}) => {
    if (variant == 'rect') {
        return (
            <StyledSkeletonLoader
                style={{
                    height: '100%',
                    width: '100%',
                    ...style,
                }}
                data-testid="loader"
            />
        );
    }
    // if type is text or invalid option
    const arr = new Array(numLines).fill(0);
    return (
        <StyledSkeletonLoader style={style} data-testid="loader">
            {arr.map((_, i) => (
                <React.Fragment key={i}>
                    &nbsp;
                    <br data-testid="loader-br" />
                </React.Fragment>
            ))}
        </StyledSkeletonLoader>
    );
};

SkeletonLoader.propTypes = {
    variant: PropTypes.oneOf(['text', 'rect']),
    numLines: PropTypes.number,
    style: PropTypes.object,
};

export default SkeletonLoader;
