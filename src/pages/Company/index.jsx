import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledCompanySection} from './styles';

const {COMPANIES} = ENUMS.MEDIA_TYPE;

export const CompanyPage = ({match, intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'companyPage.title'})}>
        <StyledCompanySection>
            <MediaContainer guid={match.params.guid} mediaType={COMPANIES} />
        </StyledCompanySection>
    </DocumentTitle>
);

CompanyPage.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(CompanyPage);
