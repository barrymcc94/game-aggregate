import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaSearchContainer from '../../containers/MediaSearchContainer';
import MediaListContainer from '../../containers/MediaListContainer';
import {StyledMediaListSection} from './styles';

const {COMPANIES} = ENUMS.MEDIA_TYPE;
const {SEARCH} = ENUMS.CONTAINER_TYPE;

export const submitForm = (e) => {
    e.preventDefault();
};

export const CompaniesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'companiesPage.title'})}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={'companiesPage.heading'} />
            </Typography>
            <form noValidate autoComplete="off" onSubmit={submitForm}>
                <MediaSearchContainer
                    mediaType={COMPANIES}
                    id="companies"
                    label={formatMessage({id: 'companiesPage.searchLabel'})}
                />
            </form>
            <MediaListContainer
                id="companies"
                mediaType={COMPANIES}
                containerType={SEARCH}
                disableScrollLoading={false}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

CompaniesPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(CompaniesPage);
