import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Franchise as FranchiseT} from '../../types';
import {ENUMS} from '../../config';
import DocumentTitle from '../DocumentTitle';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import MediaListContainer from '../../containers/MediaListContainer';
import AriaLoader from '../AriaLoader';

const {GAMES} = ENUMS.MEDIA_TYPE;
const {FILTERED} = ENUMS.CONTAINER_TYPE;

export const Franchise = ({
    franchise = {},
    isFetching,
    error,
    intl: {formatMessage},
}) => {
    if (error || (!isFetching && (!franchise || !franchise.guid))) {
        return (
            <ErrorMessage
                error={error}
                message={formatMessage({
                    id: 'franchise.error',
                })}
            />
        );
    }
    const {name = ''} = franchise;
    return (
        <DocumentTitle
            title={name || formatMessage({id: 'franchisePage.title'})}>
            <AriaLoader
                isLoading={isFetching}
                loadingMessage={formatMessage(
                    {id: 'ariaLoader.loading'},
                    {name}
                )}
                loadedMessage={formatMessage({id: 'ariaLoader.loaded'}, {name})}
            />
            <MediaHeader item={franchise} isLoading={isFetching} />
            <MediaListContainer
                id={`franchiseGames_${franchise.guid}`}
                title={formatMessage({id: 'franchise.gamesHeading'})}
                mediaType={GAMES}
                containerType={FILTERED}
                disableScrollLoading={false}
                isLoading={isFetching}
            />
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
