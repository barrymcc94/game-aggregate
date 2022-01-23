import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaListContainer from '../../containers/MediaListContainer';
import {StyledMediaListSection, StyledHeading} from './styles';

const {GAMES, COMPANIES} = ENUMS.MEDIA_TYPE;

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: 'homePage.title'})}>
        <StyledHeading variant="h4" component="h1" gutterBottom>
            <FormattedMessage id={'homePage.heading'} />
        </StyledHeading>
        <StyledMediaListSection>
            <MediaListContainer
                id="home"
                title={formatMessage({id: 'homePage.gamesHeading'})}
                mediaType={GAMES}
                disableScrollLoading={true}
                queryOverwrite={{limit: 12}}
                buttonType="link"
                loadMoreText={formatMessage({id: 'homePage.gamesLink'})}
            />
        </StyledMediaListSection>
        <StyledMediaListSection>
            <MediaListContainer
                id="home"
                title={formatMessage({id: 'homePage.companiesHeading'})}
                mediaType={COMPANIES}
                disableScrollLoading={true}
                queryOverwrite={{limit: 12}}
                buttonType="link"
                loadMoreText={formatMessage({id: 'homePage.companiesLink'})}
            />
        </StyledMediaListSection>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(HomePage);
