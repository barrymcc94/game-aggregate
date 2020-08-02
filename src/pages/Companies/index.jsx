import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {StyledMediaListSection} from './styles';
import MediaSearchContainer from '../../containers/MediaSearchContainer';
import MediaListContainer from '../../containers/MediaListContainer';

export const submitForm = (e) => {
    e.preventDefault();
}

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "companiesPage.title", defaultMessage: "Companies"})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={"companiesPage.heading"} defaultMessage="Companies" />
            </Typography>
            <form noValidate autoComplete="off" onSubmit={submitForm}>
                <MediaSearchContainer
                    mediaType="companies"
                    id="companies_search"
                    label={formatMessage({id: 'companiesPage.searchLabel', defaultMessage: "Search"})}
                />
            </form>
            <MediaListContainer
                mediaType="companies"
                containerType="search"
                allowEmptySearchFilter={true}
                disableScrollLoading={false}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
