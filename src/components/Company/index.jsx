import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {Company as CompanyT, GameListItem} from '../../types';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';
import GamesList from './GamesList';

export const Company = ({
    company = {},
    gamesData,
    isFetching,
    error,
    intl: {formatMessage},
}) => {
    if (error || (!isFetching && (!company || !company.guid))) {
        return <ErrorMessage error={error} id="company.error" />;
    }
    const {publishedGames, developedGames} = gamesData;
    const fetchingGames = isFetching || gamesData.isFetching;
    return (
        <DocumentTitle
            title={
                company.name ||
                formatMessage({
                    id: 'companyPage.title',
                    defaultMessage: 'Company',
                })
            }>
            <>
                <MediaHeader item={company} isLoading={isFetching} />
                <GamesList
                    fetchingGames={fetchingGames}
                    error={gamesData.error}
                    gamesList={publishedGames}
                    titleId="company.publishedGamesTitle"
                />
                <GamesList
                    fetchingGames={fetchingGames}
                    error={gamesData.error}
                    gamesList={developedGames}
                    titleId="company.developedGamesTitle"
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
    gamesData: PropTypes.shape({
        publishedGames: PropTypes.arrayOf(GameListItem),
        developedGames: PropTypes.arrayOf(GameListItem),
        isFetching: PropTypes.bool,
        error: PropTypes.bool,
    }),
};

export default injectIntl(Company);
