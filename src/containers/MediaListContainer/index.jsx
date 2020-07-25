import React from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import MediaList from '../../components/MediaList';

export const hasFiltersSearchTerm = ({filter}) => {
    try {
        const matchingStrs = filter.split(',').filter(str => str.startsWith('name:'));
        return !!matchingStrs[0].replace('name:','')
    } catch (e) {
        return false;
    }
}

export class MediaListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mediaListRef = React.createRef();
    }

    loadMore = () => {
        const {meta, isFetching, containerType, queryObj, fetchItems, clearState, allowEmptySearchFilter} = this.props;
        const {offset, total, filters} = meta;
        if (isFetching || (total > -1 && offset >= total)) {
            return;
        }
        if (!allowEmptySearchFilter && containerType == 'search' && !hasFiltersSearchTerm(filters)) {
            clearState();
            return;
        }
        fetchItems({queryObj});
    }

    onScroll = throttle(() => {
        if (!this.mediaListRef.current || window.innerHeight + window.pageYOffset < (this.mediaListRef.current.offsetHeight + this.mediaListRef.current.offsetTop) * 0.8) {
            return;
        }
        this.loadMore();
    }, 2000);

    componentDidMount() {
        const {clearState, disableScrollLoading} = this.props;
        clearState().then(() => {
            this.loadMore();
        });
        if (!disableScrollLoading) {
            window.addEventListener('scroll', this.onScroll);
        }
    }

    componentWillUnmount() {
        const {disableScrollLoading} = this.props;
        if (!disableScrollLoading) {
            window.removeEventListener('scroll', this.onScroll);
        }
    }

    componentDidUpdate(prevProps) {
        const {meta: {filters: {filter}}, containerType, clearState} = this.props;
        if (containerType !== prevProps.containerType) {
            clearState();
        }
        if (filter !== prevProps.meta.filters.filter) {
            this.loadMore();
        }
    }

    render() {
        const {items, isFetching, error, link} = this.props;
        return <MediaList
            ref={this.mediaListRef}
            items={items}
            isFetching={isFetching}
            error={error}
            link={link}
        />;
    }
}

MediaListContainer.propTypes = {
    items: PropTypes.array,
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    meta: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
        filters: PropTypes.object,
    }),
    containerType: PropTypes.oneOf(['all', 'search']),
    disableScrollLoading: PropTypes.bool,
    allowEmptySearchFilter: PropTypes.bool,
    queryObj: PropTypes.object,
    link: PropTypes.string,
    fetchItems: PropTypes.func,
    clearState: PropTypes.func,
}

export default MediaListContainer;