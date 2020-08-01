import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Company as CompanyT, GameListItem} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {fetchCompany} from '../../redux/actions';
import {selectCompany, selectCompanyGamesData} from '../../redux/selectors';
import Company from '../../components/Company';

export const CompanyContainer = ({guid, company={}, isFetching, error, gamesData, fetchCompany}) => {
    useEffect(() => {
        if (company && company.developed_games !== undefined) {
            return;
        }
        fetchCompany({
            guid,
            queryObj: {
                ...defaultGbApiDefaults,
            },
        });
    }, []);

    return <Company
        company={company}
        gamesData={gamesData}
        isFetching={isFetching}
        error={error}
    />;
}

const mapStateToProps = (state, props) => {
    const {isFetching, error} = state.company;
    return {
        company: selectCompany(state, props.guid),
        gamesData: selectCompanyGamesData(state, props.guid),
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
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
    gamesData: PropTypes.shape({
        publishedGames: PropTypes.arrayOf(GameListItem),
        developedGames: PropTypes.arrayOf(GameListItem),
        isFetching: PropTypes.bool,
        error: PropTypes.bool,
    }),
    fetchCompany: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer);