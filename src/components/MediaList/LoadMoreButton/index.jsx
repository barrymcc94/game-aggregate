import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import SkeletonLoader from '../../SkeletonLoader';
import {StyledButtonWrapper, StyledButton} from './styles';

export const LoadMoreButton = ({
    text,
    isLoading,
    link,
    buttonType,
    onClick,
}) => {
    const ButtonProps =
        buttonType == 'link' ? {component: Link, to: link} : {onClick};
    if (!text) {
        return null;
    }
    return (
        <StyledButtonWrapper>
            {isLoading ? (
                <SkeletonLoader
                    variant="rect"
                    style={{width: '7.5rem', height: '3rem'}}
                />
            ) : (
                <StyledButton
                    variant="outlined"
                    color="primary"
                    {...ButtonProps}>
                    {text}
                </StyledButton>
            )}
        </StyledButtonWrapper>
    );
};

LoadMoreButton.propTypes = {
    text: PropTypes.string,
    variant: PropTypes.string,
    link: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    buttonType: PropTypes.string,
    onClick: PropTypes.func,
};

export default LoadMoreButton;
