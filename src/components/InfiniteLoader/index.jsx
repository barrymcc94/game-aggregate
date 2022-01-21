import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

export const InfiniteLoader = ({listRef, loadMore, children}) => {
    const handleScroll = useRef(
        throttle((throttledLoad) => {
            if (
                !listRef?.current ||
                window.innerHeight + window.pageYOffset <
                    listRef.current.offsetHeight +
                        listRef.current.offsetTop -
                        500
            ) {
                return;
            }
            throttledLoad();
        }, 1500)
    );

    useEffect(() => {
        const onScroll = () => handleScroll.current(loadMore);
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    });

    return children;
};

InfiniteLoader.propTypes = {
    listRef: PropTypes.any,
    loadMore: PropTypes.func,
    children: PropTypes.any,
};

export default InfiniteLoader;
