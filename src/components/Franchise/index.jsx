import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Franchise as FranchiseT} from '../../types';
import {ENUMS} from '../../config';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import MediaListContainer from '../../containers/MediaListContainer';
import {StyledHeading} from './styles';

const {GAMES} = ENUMS.MEDIA_TYPE;
const {FILTERED} = ENUMS.CONTAINER_TYPE;

export const Franchise = ({
    franchise = {},
    isFetching,
    error,
    intl: {formatMessage},
}) => {
    if (error || (!isFetching && (!franchise || !franchise.guid))) {
        return <ErrorMessage error={error} id="franchise.error" />;
    }
    return (
        <DocumentTitle
            title={
                franchise.name ||
                formatMessage({
                    id: 'franchisePage.title',
                    defaultMessage: 'Franchise',
                })
            }>
            <>
                <MediaHeader item={franchise} isLoading={isFetching} />
                <StyledHeading variant="h5" component="h2" gutterBottom>
                    <FormattedMessage
                        id="franchise.gamesHeading"
                        defaultMessage="Related Games"
                    />
                </StyledHeading>
                <MediaListContainer
                    mediaType={GAMES}
                    containerType={FILTERED}
                    allowEmptySearchFilter={true}
                    disableScrollLoading={false}
                />
            </>
        </DocumentTitle>
    );
};

Franchise.propTypes = {
    intl: PropTypes.object,
    franchise: FranchiseT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
};

export default injectIntl(Franchise);
