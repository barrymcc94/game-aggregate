import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {MEDIA_TYPES} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaSearchList from '../../components/MediaSearchList';
import {StyledMediaListSection} from './styles';

export const CompaniesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'companiesPage.title'})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={'companiesPage.heading'} />
            </Typography>
            <MediaSearchList
                mediaType={MEDIA_TYPES.COMPANIES}
                id="companies"
                label={formatMessage({id: 'companiesPage.searchLabel'})}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

CompaniesPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(CompaniesPage);
