import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import DocumentTitle from '../../components/DocumentTitle';

export const AboutPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'aboutPage.title'})}>
        <section>
            <FormattedMessage id="aboutPage.aboutText" />
        </section>
    </DocumentTitle>
);

AboutPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(AboutPage);
