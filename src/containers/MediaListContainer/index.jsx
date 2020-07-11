import React from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import MediaList from '../../components/MediaList';

export class MediaListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mediaListRef = React.createRef();
    }

    onScroll = throttle(() => {
        const {loadMore} = this.props;
        if (!this.mediaListRef.current || window.pageYOffset < this.mediaListRef.current.offsetHeight*0.8) {
            return;
        }
        loadMore();
    }, 2000);

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        const {items, isFetching, error} = this.props;
        return <MediaList ref={this.mediaListRef} items={items} isFetching={isFetching} error={error}/>;
    }
}


MediaListContainer.propTypes = {
    loadMore: PropTypes.func,
    items: PropTypes.array,
    error: PropTypes.bool,
    isFetching: PropTypes.bool
}

export default MediaListContainer;