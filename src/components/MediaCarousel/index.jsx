import React, {useEffect, useState, useRef} from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
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
        moveCarousel(nextPos >= total * colWidth ? currentPos : nextPos);
    };

    return (
        <>
            <PrevButton
                style={currentPos != 0 ? {} : {display: 'none'}}
                aria-label={formatMessage({
                    id: 'carousel.prevAria',
                    defaultMessage: 'Previous',
                })}
                onClick={handlePrev}>
                <NavigateBeforeIcon />
            </PrevButton>
            <NextButton
                style={
                    currentPos + moveSpacing < total * colWidth
                        ? {}
                        : {display: 'none'}
                }
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
