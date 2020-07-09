import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';

export const AboutPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "aboutPage.title", defaultMessage: "About"})}>
        <article>
            <FormattedMessage id="aboutPage.aboutText" defaultMessage="About Text" />
        </article>
    </DocumentTitle>
);

AboutPage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(AboutPage);