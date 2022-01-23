import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Company as CompanyT} from '../../types';
import {ENUMS} from '../../config';
import DocumentTitle from '../DocumentTitle';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import MediaListContainer from '../../containers/MediaListContainer';
import AriaLoader from '../AriaLoader';

const {GAMES} = ENUMS.MEDIA_TYPE;

export const Company = ({
    company = {},
    isFetching,
    error,
    intl: {formatMessage},
}) => {
    if (error || (!isFetching && (!company || !company.guid))) {
        return (
            <ErrorMessage
                error={error}
                message={formatMessage({id: 'company.error'})}
            />
        );
    }
    const {name = ''} = company;
    return (
        <DocumentTitle title={name || formatMessage({id: 'companyPage.title'})}>
            <AriaLoader
                isLoading={isFetching}
                loadingMessage={formatMessage(
                    {id: 'ariaLoader.loading'},
                    {name}
                )}
                loadedMessage={formatMessage({id: 'ariaLoader.loaded'}, {name})}
            />
            <MediaHeader item={company} isLoading={isFetching} />
            <MediaListContainer
                id={`companyPublishedGames_${company.guid}`}
                title={formatMessage({id: 'company.publishedGamesTitle'})}
                isCarousel={true}
                mediaType={GAMES}
                preFiltered={true}
                disableScrollLoading={true}
                isLoading={isFetching}
                loadMoreText={formatMessage({
                    id: 'company.publishedGamesLoadMore',
                })}
            />
            <MediaListContainer
                id={`companyDevelopedGames_${company.guid}`}
                title={formatMessage({id: 'company.developedGamesTitle'})}
                isCarousel={true}
                mediaType={GAMES}
                preFiltered={true}
                disableScrollLoading={true}
                isLoading={isFetching}
                loadMoreText={formatMessage({
                    id: 'company.developedGamesLoadMore',
                })}
            />
        </DocumentTitle>
    );
};

Company.propTypes = {
    intl: PropTypes.object,
    company: CompanyT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
};

export default injectIntl(Company);
