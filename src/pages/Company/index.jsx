import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaContainer from '../../containers/MediaContainer';
import {StyledCompanySection} from './styles';

const {COMPANIES} = ENUMS.MEDIA_TYPE;

export const CompanyPage = ({intl: {formatMessage}}) => {
    const {guid} = useParams();
    return (
        <DocumentTitle title={formatMessage({id: 'companyPage.title'})}>
            <StyledCompanySection>
                <MediaContainer guid={guid} mediaType={COMPANIES} />
            </StyledCompanySection>
        </DocumentTitle>
    );
};

CompanyPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(CompanyPage);
