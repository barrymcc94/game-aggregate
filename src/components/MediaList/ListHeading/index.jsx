import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import SkeletonLoader from '../../SkeletonLoader';

export const ListHeading = ({title, isLoading}) =>
    isLoading && title ? (
        <Typography
            variant="h5"
            component="h2"
            gutterBottom
            data-testid="list-heading-loader">
            <SkeletonLoader variant="text" numLines={1} />
        </Typography>
    ) : title ? (
        <Typography
            variant="h5"
            component="h2"
            gutterBottom
            data-testid="list-heading">
            {title}
        </Typography>
    ) : null;

ListHeading.propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
};

export default React.memo(ListHeading);
