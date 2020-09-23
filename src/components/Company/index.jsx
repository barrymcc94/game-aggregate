import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {Company as CompanyT} from '../../types';
import {ENUMS} from '../../config';
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
        return <ErrorMessage error={error} id="company.error" />;
    }
    return (
        <DocumentTitle
            title={
                company.name ||
                formatMessage({
                    id: 'carousel.prev',
                    defaultMessage: 'Company',
                })
            }>
            <>
                <MediaHeader item={company} isLoading={isFetching} />
                <MediaListContainer
                    titleId="company.publishedGamesTitle"
                    isCarousel={true}
                    id={`companyPublishedGames_${company.guid}`}
                    mediaType={GAMES}
                    containerType={FILTERED}
                    allowEmptySearchFilter={true}
                    disableScrollLoading={true}
                    isLoading={isFetching}
                    loadMoreId="company.publishedGamesLoadMore"
                />
                <MediaListContainer
                    titleId="company.developedGamesTitle"
                    isCarousel={true}
                    id={`companyDevelopedGames_${company.guid}`}
                    mediaType={GAMES}
                    containerType={FILTERED}
                    allowEmptySearchFilter={true}
                    disableScrollLoading={true}
                    isLoading={isFetching}
                    loadMoreId="company.developedGamesLoadMore"
                />
            </>
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
