import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import SkeletonLoader from '../SkeletonLoader';
import {StyledButtonWrapper, StyledButton} from './styles';

export const LoadMoreButton = ({id, isLoading, link, buttonType, onClick}) => {
    const ButtonProps =
        buttonType == 'link' ? {component: Link, to: link} : {onClick};
    if (!id) {
        return null;
    }
    return isLoading ? (
        <StyledButtonWrapper>
            <SkeletonLoader
                variant="rect"
                style={{width: '7.5rem', height: '3rem'}}
            />
        </StyledButtonWrapper>
    ) : (
        <StyledButtonWrapper>
            <StyledButton variant="outlined" color="primary" {...ButtonProps}>
                <FormattedMessage id={id} defaultMessage="Load More" />
            </StyledButton>
        </StyledButtonWrapper>
    );
};

LoadMoreButton.propTypes = {
    id: PropTypes.string,
    variant: PropTypes.string,
    link: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    buttonType: PropTypes.string,
    onClick: PropTypes.func,
};

export default LoadMoreButton;
