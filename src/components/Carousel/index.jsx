import React, {useEffect, useState, useRef} from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import {FixedSizeList} from 'react-window';
import MediaListItem from '../MediaListItem';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {ListItem, PrevButton, NextButton} from './styles';

const colWidth = 300;
const colHeight = 350;

const Column = ({index, style, data: {items, link}}) => (
    <ListItem style={{...style}}>
        {items[index] ? (
            <MediaListItem key={index} item={items[index]} link={link} />
        ) : (
            <MediaListItem key={index} item={{}} isLoading={true} />
        )}
    </ListItem>
);

const Carousel = ({items, total, error, width, link, loadMore, isLoading}) => {
    const outerRef = useRef();

    const [currentPos, setCurrentPos] = useState(0);
    const moveSpacing = (Math.floor(width / colWidth) || 1) * colWidth;

    const handleScroll = throttle(() => {
        loadMore();
    }, 500);

    useEffect(() => {
        outerRef?.current?.addEventListener('scroll', handleScroll);
        return () => {
            outerRef?.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const moveCarousel = (newPos) => {
        if (currentPos == newPos) {
            return;
        }
        setCurrentPos(newPos);
        outerRef?.current?.scrollTo({
            left: newPos,
            behavior: 'smooth',
        });
    };

    const handlePrev = () => {
        const prevPos = currentPos - moveSpacing;
        moveCarousel(prevPos < 0 ? 0 : prevPos);
    };

    const handleNext = () => {
        const nextPos = currentPos + moveSpacing;
        moveCarousel(nextPos >= (total + 1) * colWidth ? currentPos : nextPos);
    };

    return !error && (total || isLoading) ? (
        <>
            <PrevButton aria-label="previous" onClick={handlePrev}>
                <NavigateBeforeIcon />
            </PrevButton>
            <NextButton aria-label="next" onClick={handleNext}>
                <NavigateNextIcon />
            </NextButton>
            <FixedSizeList
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
    ) : null;
};

Column.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    data: PropTypes.object,
};

Carousel.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    error: PropTypes.bool,
    width: PropTypes.number,
    link: PropTypes.string,
    isLoading: PropTypes.bool,
    loadMore: PropTypes.func,
};

export default Carousel;
