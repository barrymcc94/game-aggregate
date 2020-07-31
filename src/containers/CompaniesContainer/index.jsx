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

export const CompaniesContainer = ({containerType, allowEmptySearchFilter, disableLoadMore, companies, isFetching, error, meta, clearCompaniesState, fetchCompanies}) => (
    <MediaListContainer
        link={'/companies/'}
        containerType={containerType}
        allowEmptySearchFilter={allowEmptySearchFilter}
        disableScrollLoading={disableLoadMore}
        items={companies}
        isFetching={isFetching}
        error={error}
        meta={meta}
        queryObj={{
            ...defaultGbApiDefaults,
            sort: `original_release_date:desc`,
            filter: objToFilterStr(getDefaultCompaniesFilter()),
            limit: meta.limit,
            offset: meta.offset
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
    containerType: PropTypes.oneOf(['all', 'search']),
    disableLoadMore: PropTypes.bool,
    allowEmptySearchFilter: PropTypes.bool,
    companies: PropTypes.arrayOf(CompanyListItem),
    error: PropTypes.bool,
    isFetching: PropTypes.bool,
    meta: PropTypes.shape({
        offset: PropTypes.number,
        limit: PropTypes.number,
        total: PropTypes.number,
        filters: PropTypes.object,
    }),
    fetchCompanies: PropTypes.func,
    clearCompaniesState: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesContainer);