import {useEffect} from 'react';
import PropTypes from 'prop-types';

export const DocumentTitle = ({title, children}) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    });
    return children || null;
};

DocumentTitle.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

export default DocumentTitle;
