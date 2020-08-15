import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import MediaListContainer from '../../containers/MediaListContainer';
import MediaSearchContainer from '../../containers/MediaSearchContainer';
import {StyledMediaListSection} from './styles';

const {FRANCHISES} = ENUMS.MEDIA_TYPE;
const {SEARCH} = ENUMS.CONTAINER_TYPE;

export const submitForm = (e) => {
    e.preventDefault();
};

export const FranchisesPage = ({intl: {formatMessage}}) => (
    <DocumentTitle
        title={formatMessage({
            id: 'franchisesPage.title',
            defaultMessage: 'Search',
        })}>
        <StyledMediaListSection>
            <Typography variant="h4" component="h1" gutterBottom>
                <FormattedMessage
                    id="franchisesPage.heading"
                    defaultMessage="Franchise Search"
                />
            </Typography>
            <form noValidate autoComplete="off" onSubmit={submitForm}>
                <MediaSearchContainer
                    mediaType={FRANCHISES}
                    id="franchises_search"
                    label={formatMessage({
                        id: 'franchisesPage.searchLabel',
                        defaultMessage: 'Search',
                    })}
                />
            </form>
            <MediaListContainer
                mediaType={FRANCHISES}
                containerType={SEARCH}
                allowEmptySearchFilter={true}
                disableScrollLoading={false}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

FranchisesPage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(FranchisesPage);