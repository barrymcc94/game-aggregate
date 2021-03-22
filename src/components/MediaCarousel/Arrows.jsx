import React from 'react';
import PropTypes from 'prop-types';
import isMobile from 'is-mobile';
import {injectIntl} from 'react-intl';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {PrevButton, NextButton} from './styles';

export const getBtnStyle = (show) =>
    !show ? {display: 'none', visibility: 'hidden'} : {};

const Arrows = ({
    showPrev,
    showNext,
    onPrevClick,
    onNextClick,
    intl: {formatMessage},
}) =>
    !isMobile({featureDetect: true, tablet: true}) && (
        <>
            <PrevButton
                style={getBtnStyle(showPrev)}
                aria-label={formatMessage({id: 'carousel.prevAria'})}
                onClick={onPrevClick}>
                <NavigateBeforeIcon />
            </PrevButton>
            <NextButton
                style={getBtnStyle(showNext)}
                aria-label={formatMessage({id: 'carousel.nextAria'})}
                onClick={onNextClick}>
                <NavigateNextIcon />
            </NextButton>
        </>
    );

Arrows.propTypes = {
    showPrev: PropTypes.bool,
    showNext: PropTypes.bool,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    intl: PropTypes.object,
};

export default injectIntl(Arrows);
