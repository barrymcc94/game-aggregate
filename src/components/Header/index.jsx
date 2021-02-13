import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AuthModalContainer from '../../containers/AuthModalContainer';
import {ENUMS} from '../../config';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Zoom} from '@material-ui/core';
import {
    MenuIcon,
    CloseIcon,
    StyledHeader,
    StyledNav,
    StyledContainer,
    NavLinkList,
    NavLinkListItem,
    StyledIconButton,
    StyledLink,
    StyledDrawer,
    StyledDrawerHeaderContainer,
} from './styles.js';

const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const Header = ({intl: {formatMessage}}) => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    return (
        <StyledHeader>
            <StyledDrawer anchor={'left'} open={menuActive} onClose={closeMenu}>
                <StyledDrawerHeaderContainer maxWidth="lg">
                    <Zoom in={menuActive}>
                        <StyledIconButton
                            aria-label={formatMessage({
                                id: 'header.closeMenu',
                                defaultMessage: 'close',
                            })}
                            aria-expanded={menuActive}
                            onClick={closeMenu}>
                            <CloseIcon />
                        </StyledIconButton>
                    </Zoom>
                </StyledDrawerHeaderContainer>
                <NavLinkList active={menuActive} onClick={closeMenu}>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink exact to="/">
                            <FormattedMessage
                                id="header.home"
                                defaultMessage="Home"
                            />
                        </StyledLink>
                    </NavLinkListItem>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink exact to={`/${GAMES}/`}>
                            <FormattedMessage
                                id="header.games"
                                defaultMessage="Games"
                            />
                        </StyledLink>
                    </NavLinkListItem>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink exact to={`/${COMPANIES}/`}>
                            <FormattedMessage
                                id="header.companies"
                                defaultMessage="Companies"
                            />
                        </StyledLink>
                    </NavLinkListItem>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink exact to={`/${FRANCHISES}/`}>
                            <FormattedMessage
                                id="header.franchises"
                                defaultMessage="Franchises"
                            />
                        </StyledLink>
                    </NavLinkListItem>
                </NavLinkList>
            </StyledDrawer>
            <StyledContainer maxWidth="lg">
                <StyledNav>
                    <Zoom in={!menuActive}>
                        <StyledIconButton
                            aria-label={formatMessage({
                                id: 'header.openMenu',
                                defaultMessage: 'open',
                            })}
                            aria-expanded={menuActive}
                            onClick={toggleMenu}>
                            <MenuIcon />
                        </StyledIconButton>
                    </Zoom>
                    <AuthModalContainer />
                </StyledNav>
            </StyledContainer>
        </StyledHeader>
    );
};

Header.propTypes = {
    intl: PropTypes.object,
};

export default injectIntl(Header);
