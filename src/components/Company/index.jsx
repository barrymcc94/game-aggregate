import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {Company as CompanyT} from '../../types';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';

export const Company = ({company={}, isFetching, error, intl: {formatMessage}}) => {
    if (error || (!isFetching && (!company || !company.guid))) {
        return <ErrorMessage error={error} id="company.error" />;
    }
    return <DocumentTitle title={company.name || formatMessage({id: "companyPage.title", defaultMessage: "Company"})}>
        <>
            <MediaHeader item={company} isLoading={isFetching} />
        </>
    </DocumentTitle>;
}

Company.propTypes = {
    intl: PropTypes.object,
    company: CompanyT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
}

export default injectIntl(Company);