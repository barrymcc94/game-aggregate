import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import DocumentTitle from '../../components/DocumentTitle';
import MediaListContainer from '../../containers/MediaListContainer';
import {StyledMediaListSection, StyledHeading} from './styles';

const {GAMES, COMPANIES} = ENUMS.MEDIA_TYPE;
const {ALL} = ENUMS.CONTAINER_TYPE;

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
                containerType={ALL}
                disableScrollLoading={true}
                limit={12}
                buttonType="link"
                loadMoreText={formatMessage({id: 'homePage.gamesLink'})}
            />
        </StyledMediaListSection>
        <StyledMediaListSection>
            <MediaListContainer
                title={formatMessage({id: 'homePage.companiesHeading'})}
                mediaType={COMPANIES}
                containerType={ALL}
                disableScrollLoading={true}
                limit={12}
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
