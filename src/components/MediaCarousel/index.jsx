import React, {useEffect, useState, useRef} from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {FixedSizeList} from 'react-window';
import MediaListItem from '../MediaListItem';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {ListItem, PrevButton, NextButton} from './styles';

const colWidth = 300;
const colHeight = 350;

export const getBtnStyle = (show) =>
    !show ? {display: 'none', visibility: 'hidden'} : {};

export const calculatePrevPos = (currentPos, moveSpacing) => {
    const prevPos = currentPos - moveSpacing;
    return prevPos < 0 ? 0 : prevPos;
};

export const calculateNextPos = (currentPos, moveSpacing, total) => {
    const nextPos = currentPos + moveSpacing;
    return nextPos >= total * colWidth ? currentPos : nextPos;
};

const Column = ({index, style, data: {items, link}}) => (
    <ListItem style={{...style}}>
        {items[index] ? (
            <MediaListItem key={index} item={items[index]} link={link} />
        ) : (
            <MediaListItem key={index} item={{}} isLoading={true} />
        )}
    </ListItem>
);

const Carousel = ({
    items,
    total,
    width,
    link,
    loadMore,
    intl: {formatMessage},
}) => {
    const outerRef = useRef();

    const [currentPos, setCurrentPos] = useState(0);
    const moveSpacing = (Math.floor(width / colWidth) || 1) * colWidth;

    const handleScrollLoad = throttle(() => {
        loadMore();
    }, 1000);

    const handleScrollPos = debounce(() => {
        setCurrentPos(
            Math.ceil(outerRef?.current?.scrollLeft / moveSpacing) * moveSpacing
        );
    }, 250);

    useEffect(() => {
        outerRef?.current?.addEventListener('scroll', handleScrollLoad);
        outerRef?.current?.addEventListener('scroll', handleScrollPos);
        return () => {
            outerRef?.current?.removeEventListener('scroll', handleScrollLoad);
            outerRef?.current?.removeEventListener('scroll', handleScrollPos);
        };
    }, []);

    const moveCarousel = (newPos) => {
        if (currentPos == newPos) {
            return;
        }
        outerRef?.current?.scrollTo({
            left: newPos,
            behavior: 'smooth',
        });
    };

    const handlePrev = () => {
        moveCarousel(calculatePrevPos(currentPos, moveSpacing));
    };

    const handleNext = () => {
        moveCarousel(calculateNextPos(currentPos, moveSpacing, total));
    };

    return (
        <>
            <PrevButton
                style={getBtnStyle(currentPos != 0)}
                aria-label={formatMessage({
                    id: 'carousel.prevAria',
                    defaultMessage: 'Previous',
                })}
                onClick={handlePrev}>
                <NavigateBeforeIcon />
            </PrevButton>
            <NextButton
                style={getBtnStyle(currentPos + moveSpacing < total * colWidth)}
                aria-label={formatMessage({
                    id: 'carousel.nextAria',
                    defaultMessage: 'Next',
                })}
                onClick={handleNext}>
                <NavigateNextIcon />
            </NextButton>
            <FixedSizeList
                className="carousel-list"
                outerRef={outerRef}
                overscanCount={5}
                height={colHeight}
                itemCount={total}
                itemSize={colWidth}
                layout="horizontal"
                width={width}
                itemData={{items, link, loadMore}}>
                {Column}
            </FixedSizeList>
        </>
    );
};

Column.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    data: PropTypes.object,
};

Carousel.propTypes = {
    intl: PropTypes.object,
    items: PropTypes.array,
    total: PropTypes.number,
    width: PropTypes.number,
    link: PropTypes.string,
    loadMore: PropTypes.func,
};

export default injectIntl(Carousel);
