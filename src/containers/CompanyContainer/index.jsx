import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Company as CompanyT} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {fetchCompany} from '../../redux/actions';
import {selectCompany} from '../../redux/selectors';
import Company from '../../components/Company';

export const CompanyContainer = ({guid, company, isFetching, error, fetchCompany}) => {
    useEffect(() => {
        fetchCompany({
            guid,
            queryObj: {
                ...defaultGbApiDefaults,
            },
        });
    }, []);

    return <Company company={company} isFetching={isFetching} error={error} />;
}

const mapStateToProps = (state, props) => {
    const {meta: {isFetching, error}} = state.company;
    return {
        company: selectCompany(state, props.guid),
        isFetching,
        error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchCompany,
    }, dispatch);
}

CompanyContainer.propTypes = {
    guid: PropTypes.string,
    company: CompanyT,
    fetchCompany: PropTypes.func,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer);