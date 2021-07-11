import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {FormattedMessage, injectIntl} from 'react-intl';
import {
    StyledModalContent,
    Heading,
    Text,
    ButtonWrapper,
    StyledTextField,
    TextFieldWrapper,
    SuccessText,
    ProgressSpinner,
    ModalButton,
} from './styles.js';

export const AuthModal = ({
    appCode,
    isFetching,
    error,
    api_key,
    modalActive,
    toggleModal,
    onAppCodeChange,
    submitForm,
    intl: {formatMessage},
}) => (
    <>
        <Modal
            open={modalActive}
            aria-label={formatMessage({id: 'authModal.ariaLabel'})}>
            <StyledModalContent>
                <Heading variant="h5" component="h2" gutterBottom>
                    <FormattedMessage id="authModal.heading" />
                </Heading>
                <Text variant="body1">
                    <FormattedMessage
                        id="authModal.description"
                        values={{
                            link: (
                                <a
                                    href="https://www.giantbomb.com/app/myapp/"
                                    rel="noreferrer"
                                    target="_blank">
                                    Giantbomb
                                </a>
                            ),
                        }}
                    />
                </Text>
                <form onSubmit={submitForm}>
                    <TextFieldWrapper>
                        <StyledTextField
                            disabled={isFetching}
                            variant="outlined"
                            label={formatMessage({
                                id: 'authModal.appCodeLabel',
                            })}
                            value={appCode}
                            onChange={onAppCodeChange}
                            error={error}
                            helperText={
                                api_key ? (
                                    <SuccessText>
                                        <FormattedMessage id="authModal.success" />
                                    </SuccessText>
                                ) : error ? (
                                    formatMessage({id: 'authModal.error'})
                                ) : (
                                    ''
                                )
                            }
                            data-testid="auth-code-input"
                        />
                        {isFetching ? (
                            <ProgressSpinner data-testid="progress-spinner" />
                        ) : null}
                    </TextFieldWrapper>
                    <ButtonWrapper>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={isFetching || !appCode}
                            onClick={submitForm}
                            data-testid="auth-code-submit">
                            <FormattedMessage id="authModal.submit" />
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={isFetching || !api_key}
                            onClick={toggleModal}
                            data-testid="auth-code-close">
                            <FormattedMessage id="authModal.close" />
                        </Button>
                    </ButtonWrapper>
                </form>
            </StyledModalContent>
        </Modal>
        <ModalButton
            variant="contained"
            color="primary"
            onClick={toggleModal}
            aria-label={formatMessage({id: 'header.authButton'})}
            data-testid="modal-btn">
            <AccountCircleIcon />
        </ModalButton>
    </>
);

AuthModal.propTypes = {
    intl: PropTypes.object,
    appCode: PropTypes.string,
    api_key: PropTypes.string,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
    modalActive: PropTypes.bool,
    toggleModal: PropTypes.func,
    onAppCodeChange: PropTypes.func,
    submitForm: PropTypes.func,
};

export default injectIntl(AuthModal);
