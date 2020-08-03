import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';
import {ENUMS} from '../../config';
import MediaListContainer from '../../containers/MediaListContainer';
import {StyledMediaListSection, StyledHeading, StyledLinkContainer, StyledLink} from './styles';

const {GAMES, COMPANIES} = ENUMS.MEDIA_TYPE;
const {ALL} = ENUMS.CONTAINER_TYPE;

export const HomePage = ({intl: {formatMessage}}) => (
    <DocumentTitle title={formatMessage({id: "homePage.title", defaultMessage: "Games and Companies"})}>
        <>
            <StyledHeading variant="h4" component="h1" gutterBottom>
                <FormattedMessage id={"homePage.heading"} defaultMessage="Games and Companies" />
            </StyledHeading>
            <StyledMediaListSection>
                <Typography variant="h5" component="h2" gutterBottom>
                    <FormattedMessage id={"homePage.gamesHeading"} defaultMessage="Games" />
                </Typography>
                <MediaListContainer
                    mediaType={GAMES}
                    containerType={ALL}
                    allowEmptySearchFilter={true}
                    disableScrollLoading={true}
                    limit={12}
                />
                <StyledLinkContainer>
                    <StyledLink component={RouterLink} to={`/${GAMES}/`}>
                        <FormattedMessage id={"homePage.gamesLink"} defaultMessage="See all games" />
                    </StyledLink>
                </StyledLinkContainer>
            </StyledMediaListSection>
            <StyledMediaListSection>
                <Typography variant="h5" component="h2" gutterBottom>
                    <FormattedMessage id={"homePage.companiesHeading"} defaultMessage="Companies" />
                </Typography>
                <MediaListContainer
                    mediaType={COMPANIES}
                    containerType={ALL}
                    allowEmptySearchFilter={true}
                    disableScrollLoading={true}
                    limit={12}
                />
                <StyledLinkContainer>
                    <StyledLink component={RouterLink} to={`/${COMPANIES}/`}>
                        <FormattedMessage id={"homePage.companiesLink"} defaultMessage="See all companies" />
                    </StyledLink>
                </StyledLinkContainer>
            </StyledMediaListSection>
        </>
    </DocumentTitle>
);

HomePage.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(HomePage);
