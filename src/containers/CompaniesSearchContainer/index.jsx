import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getDefaultCompaniesFilter} from '../../utils';
import {setCompaniesSearchFilters} from '../../redux/actions';
import MediaSearchContainer from '../MediaSearchContainer';

export const CompaniesSearchContainer = ({searchLabel, setCompaniesSearchFilters}) => (
    <MediaSearchContainer
        searchId="companies_search"
        searchLabel={searchLabel}
        filter={getDefaultCompaniesFilter()}
        setSearchFilters={setCompaniesSearchFilters}
    />
);

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setCompaniesSearchFilters
    }, dispatch);
}

CompaniesSearchContainer.propTypes = {
    searchLabel: PropTypes.string,
    setCompaniesSearchFilters: PropTypes.func
}

export default connect(null, mapDispatchToProps)(CompaniesSearchContainer);