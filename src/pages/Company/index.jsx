import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {injectIntl} from 'react-intl';
import {MEDIA_TYPES} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledCompanySection} from './styles';

export const CompanyPage = ({intl: {formatMessage}}) => {
    const {guid} = useParams();
    return (
        <DocumentTitle title={formatMessage({id: 'companyPage.title'})}>
            <StyledCompanySection>
                <MediaContainer guid={guid} mediaType={MEDIA_TYPES.COMPANIES} />
            </StyledCompanySection>
        </DocumentTitle>
    );
};

CompanyPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(CompanyPage);
