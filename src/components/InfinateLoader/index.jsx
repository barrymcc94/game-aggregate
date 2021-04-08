import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

export class InfinateLoader extends React.Component {
    onScroll = throttle(() => {
        const {listRef, loadMore} = this.props;
        if (
            !listRef?.current ||
            window.innerHeight + window.pageYOffset <
                (listRef.current.offsetHeight + listRef.current.offsetTop) * 0.8
        ) {
            return;
        }
        loadMore();
    }, 1500);

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        return this.props.children;
    }
}

InfinateLoader.propTypes = {
    listRef: PropTypes.any,
    loadMore: PropTypes.func,
    children: PropTypes.any,
};

export default InfinateLoader;
