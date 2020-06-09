import PropTypes from 'prop-types';

export const GenericObject = PropTypes.shape({
    api_detail_url: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    site_detail_url: PropTypes.string,
});