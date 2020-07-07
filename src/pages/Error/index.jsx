import React from 'react';
import {Link} from 'react-router-dom';
import {ErrorHeader, ErrorText} from './styles';
import {FormattedMessage} from 'react-intl';

const ErrorPage = () => (
    <section>
        <ErrorHeader>
            <FormattedMessage
                id="errorPage.errorHeading"
                defaultMessage="404 - Page Not Found" />
        </ErrorHeader>
        <ErrorText>
            <Link to={'/'}>
                <FormattedMessage
                    id="errorPage.errorMessage"
                    defaultMessage="Click here to go back to the homepage"
                />
            </Link>
        </ErrorText>
    </section>
);

export default ErrorPage;