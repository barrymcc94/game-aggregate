import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import SkeletonLoader from '../../SkeletonLoader';

export const ListHeading = ({title, isLoading}) =>
    isLoading && title ? (
        <Typography variant="h5" component="h2" gutterBottom>
            <SkeletonLoader variant="text" numLines={1} />
        </Typography>
    ) : title ? (
        <Typography variant="h5" component="h2" gutterBottom>
            {title}
        </Typography>
    ) : null;

ListHeading.propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
};

export default React.memo(ListHeading);
