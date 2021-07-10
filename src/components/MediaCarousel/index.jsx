import React, {useEffect, useState, useRef} from 'react';
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
    <ListItem style={{...style}} data-testid="carousel-column">
        {items[index] ? (
            <MediaListItem key={index} item={items[index]} link={link} />
        ) : (
            <MediaListItem key={index} item={{}} isLoading={true} />
        )}
    </ListItem>
);

const MediaCarousel = React.forwardRef(
    ({items, total, link, loadMore}, ref) => {
        const [width, setWidth] = useState(0);
        const [currentPos, setCurrentPos] = useState(0);
        const moveSpacing = (Math.floor(width / colWidth) || 1) * colWidth;
        const outerRef = useRef();
        const handleScroll = useRef(
            throttle((throttledFunc) => {
                throttledFunc();
            }, 1500)
        );

        useEffect(() => {
            const onResize = debounce(() => {
                setWidth(ref?.current?.clientWidth || 0);
            }, 250);

            onResize();
            window.addEventListener('resize', onResize);

            return () => {
                window.removeEventListener('resize', onResize);
            };
        }, []);

        useEffect(() => {
            const onScroll = () => handleScroll.current(loadMore);
            const handleScrollPos = debounce(() => {
                setCurrentPos(
                    Math.ceil(outerRef?.current?.scrollLeft / moveSpacing) *
                        moveSpacing
                );
            }, 250);

            outerRef?.current?.addEventListener('scroll', onScroll);
            outerRef?.current?.addEventListener('scroll', handleScrollPos);
            return () => {
                outerRef?.current?.removeEventListener('scroll', onScroll);
                outerRef?.current?.removeEventListener(
                    'scroll',
                    handleScrollPos
                );
            };
        });

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
            <StyledCarouselWrapper ref={ref} data-testid="carousel">
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
