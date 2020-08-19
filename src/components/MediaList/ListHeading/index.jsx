import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import SkeletonLoader from '../../SkeletonLoader';

export const ListHeading = ({titleId, isLoading, displayTitle}) =>
    isLoading ? (
        <Typography variant="h5" component="h2" gutterBottom>
            <SkeletonLoader variant="text" numLines={1} />
        </Typography>
    ) : titleId && displayTitle ? (
        <Typography variant="h5" component="h2" gutterBottom>
            <FormattedMessage id={titleId} defaultMessage="Games" />
        </Typography>
    ) : null;

ListHeading.propTypes = {
    titleId: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    displayTitle: PropTypes.bool.isRequired,
};

export default ListHeading;
