import React from 'react';
import PropTypes from 'prop-types';
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
    <Modal
        open={modalActive}
        aria-label={formatMessage({
            id: 'authModal.ariaLabel',
            defaultMessage: 'Authentication Modal',
        })}>
        <StyledModalContent>
            <Heading variant="h5" component="h2" gutterBottom>
                <FormattedMessage
                    id="authModal.heading"
                    defaultMessage="Authentication"
                />
            </Heading>
            <Text variant="body1">
                <FormattedMessage
                    id="authModal.description"
                    defaultMessage="Auth key required, you can get one at {link}"
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
                            defaultMessage: 'Enter App Code',
                        })}
                        value={appCode}
                        onChange={onAppCodeChange}
                        error={error}
                        helperText={
                            api_key ? (
                                <SuccessText>
                                    <FormattedMessage
                                        id="authModal.success"
                                        defaultMessage="Success"
                                    />
                                </SuccessText>
                            ) : error ? (
                                formatMessage({
                                    id: 'authModal.error',
                                    defaultMessage: 'Error Occurred',
                                })
                            ) : (
                                ''
                            )
                        }
                    />
                    {isFetching ? <ProgressSpinner /> : null}
                </TextFieldWrapper>
                <ButtonWrapper>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={isFetching || !appCode}
                        onClick={submitForm}>
                        <FormattedMessage
                            id="authModal.submit"
                            defaultMessage="Submit"
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={isFetching || !api_key}
                        onClick={toggleModal}>
                        <FormattedMessage
                            id="authModal.Close"
                            defaultMessage="Close"
                        />
                    </Button>
                </ButtonWrapper>
            </form>
        </StyledModalContent>
    </Modal>
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
