import React from 'react';
import PropTypes from 'prop-types';
import {CompanyListItem} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {objToFilterStr, getDefaultCompaniesFilter} from '../../utils';
import {fetchCompanies, clearCompaniesState} from '../../redux/actions';
import {selectCompanies} from '../../redux/selectors';
import MediaListContainer from '../MediaListContainer';

export const CompaniesContainer = ({companies, isFetching, error, containerType, allowEmptySearchFilter, meta, clearCompaniesState, fetchCompanies}) => (
    <MediaListContainer
        link={'/companies/'}
        items={companies}
        isFetching={isFetching}
        error={error}
        meta={meta}
        containerType={containerType}
        allowEmptySearchFilter={allowEmptySearchFilter}
        queryObj={{
            ...defaultGbApiDefaults,
            sort: `original_release_date:desc`,
            filter: objToFilterStr({
                ...getDefaultCompaniesFilter(),
            }),
            limit: meta.limit,
            offset: meta.offset,
            ...meta.filters
        }}
        fetchItems={fetchCompanies}
        clearState={clearCompaniesState}
    />
);

const mapStateToProps = (state) => {
    const {isFetching, error, meta} = state.companies;
    return {
        companies: selectCompanies(state),
        isFetching,
        error,
        meta,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchCompanies,
        clearCompaniesState,
    }, dispatch);
}

CompaniesContainer.propTypes = {
    companies: PropTypes.arrayOf(CompanyListItem),
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    meta: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
        filters: PropTypes.object,
    }),
    containerType: PropTypes.oneOf(['all', 'search']),
    allowEmptySearchFilter: PropTypes.bool,
    fetchCompanies: PropTypes.func,
    clearCompaniesState: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesContainer);