import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Franchise as FranchiseT} from '../../types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultGbApiDefaults} from '../../config';
import {fetchFranchise} from '../../redux/actions';
import {selectFranchise} from '../../redux/selectors';
import Franchise from '../../components/Franchise';

export const FranchiseContainer = ({
    guid,
    franchise = {},
    isFetching,
    error,
    fetchFranchise,
}) => {
    useEffect(() => {
        if (franchise && franchise.games !== undefined) {
            return;
        }
        fetchFranchise({
            guid,
            queryObj: {
                ...defaultGbApiDefaults,
            },
        });
    }, []);

    return (
        <Franchise
            franchise={franchise}
            isFetching={isFetching}
            error={error}
        />
    );
};

const mapStateToProps = (state, props) => {
    const {isFetching, error} = state.franchise;
    return {
        franchise: selectFranchise(state, props.guid),
        isFetching,
        error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchFranchise,
        },
        dispatch
    );
};

FranchiseContainer.propTypes = {
    guid: PropTypes.string,
    franchise: FranchiseT,
    fetchFranchise: PropTypes.func,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(FranchiseContainer);
