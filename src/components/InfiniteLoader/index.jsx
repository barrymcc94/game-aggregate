import {useEffect} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

export const InfiniteLoader = ({listRef, loadMore, children}) => {
    useEffect(() => {
        const onScroll = throttle(() => {
            if (
                !listRef?.current ||
                window.innerHeight + window.pageYOffset <
                    (listRef.current.offsetHeight + listRef.current.offsetTop) *
                        0.8
            ) {
                return;
            }
            loadMore();
        }, 1500);
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return children;
};

InfiniteLoader.propTypes = {
    listRef: PropTypes.any,
    loadMore: PropTypes.func,
    children: PropTypes.any,
};

export default InfiniteLoader;
