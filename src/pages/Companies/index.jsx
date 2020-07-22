import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {StyledMediaListSection} from './styles';
import CompaniesSearchContainer from '../../containers/CompaniesSearchContainer';
import CompaniesContainer from '../../containers/CompaniesContainer';

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
                <CompaniesSearchContainer searchLabel={formatMessage({id: 'companiesPage.searchLabel', defaultMessage: "Search"})} />
            </form>
            <CompaniesContainer containerType="search" allowEmptySearchFilter={true} />
        </StyledMediaListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
