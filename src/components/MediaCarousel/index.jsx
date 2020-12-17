import React, {useEffect, useState, useCallback, useRef} from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import {FixedSizeList} from 'react-window';
import MediaListItem from '../MediaListItem';
import Arrows from './Arrows';
import {StyledCarouselWrapper, ListItem} from './styles';

const colWidth = 300;
const colHeight = 350;

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

const MediaCarousel = React.forwardRef(
    ({items, total, link, loadMore}, ref) => {
        const outerRef = useRef();

        const [width, setWidth] = useState(0);
        const [currentPos, setCurrentPos] = useState(0);
        const moveSpacing = (Math.floor(width / colWidth) || 1) * colWidth;

        const handleScrollLoad = useCallback(
            throttle(() => {
                loadMore();
            }, 1000),
            []
        );

        const handleScrollPos = useCallback(
            debounce(() => {
                setCurrentPos(
                    Math.ceil(outerRef?.current?.scrollLeft / moveSpacing) *
                        moveSpacing
                );
            }, 250),
            []
        );

        const onResize = useCallback(
            debounce(() => {
                setWidth(ref?.current?.clientWidth || 0);
            }, 250),
            []
        );

        useEffect(() => {
            onResize();
            window.addEventListener('resize', onResize);
            outerRef?.current?.addEventListener('scroll', handleScrollLoad);
            outerRef?.current?.addEventListener('scroll', handleScrollPos);
            return () => {
                window.removeEventListener('resize', onResize);
                outerRef?.current?.removeEventListener(
                    'scroll',
                    handleScrollLoad
                );
                outerRef?.current?.removeEventListener(
                    'scroll',
                    handleScrollPos
                );
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
            <StyledCarouselWrapper ref={ref}>
                <Arrows
                    showPrev={currentPos != 0}
                    showNext={currentPos + moveSpacing < total * colWidth}
                    onPrevClick={handlePrev}
                    onNextClick={handleNext}
                />
                <FixedSizeList
                    innerElementType="ul"
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
            </StyledCarouselWrapper>
        );
    }
);

Column.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    data: PropTypes.object,
};

MediaCarousel.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    link: PropTypes.string,
    loadMore: PropTypes.func,
};

MediaCarousel.displayName = 'MediaCarousel';
export default MediaCarousel;
