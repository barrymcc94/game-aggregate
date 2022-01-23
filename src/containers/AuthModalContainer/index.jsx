import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {defaultGbApiDefaults} from '../../config';
import {fetchGBApiKey} from '../../redux/actions';
import AuthModal from '../../components/AuthModal';

export const AuthModalContainer = ({
    isFetching,
    error,
    api_key,
    fetchGBApiKey,
    history,
}) => {
    const [alreadyAuthenticated] = useState(!!api_key);
    const [modalOpen, setModalOpen] = useState(!api_key);
    const [appCode, setAppCode] = useState('');
    const [showErrs, setShowErrs] = useState(false);
    useEffect(() => {
        setShowErrs(error);
    }, [error]);
    useEffect(() => {
        if (appCode && showErrs) {
            setShowErrs(false);
        }
    }, [appCode]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen && !alreadyAuthenticated) {
            history.push('/empty');
            history.goBack();
        }
    };

    const onAppCodeChange = (e) => {
        const {value} = e.target;
        setAppCode(value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        fetchGBApiKey({
            query: {...defaultGbApiDefaults, regCode: appCode},
        });
        setAppCode('');
    };

    return (
        <AuthModal
            isFetching={isFetching}
            error={error && showErrs}
            modalActive={modalOpen}
            appCode={appCode}
            api_key={api_key}
            toggleModal={toggleModal}
            onAppCodeChange={onAppCodeChange}
            submitForm={submitForm}
        />
    );
};

const mapStateToProps = (state) => {
    const {
        giantbomb: {api_key, isFetching, error},
    } = state.auth;
    return {
        api_key,
        isFetching,
        error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchGBApiKey}, dispatch);
};

AuthModalContainer.propTypes = {
    api_key: PropTypes.string,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
    fetchGBApiKey: PropTypes.func,
    history: PropTypes.object,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AuthModalContainer)
);
