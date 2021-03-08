import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Company as CompanyT} from '../../types';
import {ENUMS} from '../../config';
import DocumentTitle from '../DocumentTitle';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import MediaListContainer from '../../containers/MediaListContainer';

const {GAMES} = ENUMS.MEDIA_TYPE;
const {FILTERED} = ENUMS.CONTAINER_TYPE;

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
    return (
        <DocumentTitle
            title={
                company.name ||
                formatMessage({
                    id: 'companyPage.title',
                    defaultMessage: 'Company',
                })
            }>
            <MediaHeader item={company} isLoading={isFetching} />
            <MediaListContainer
                id={`companyPublishedGames_${company.guid}`}
                title={formatMessage({id: 'company.publishedGamesTitle'})}
                isCarousel={true}
                mediaType={GAMES}
                containerType={FILTERED}
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
                containerType={FILTERED}
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
