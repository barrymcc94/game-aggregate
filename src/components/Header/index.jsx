import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AuthModalContainer from '../../containers/AuthModalContainer';
import {MEDIA_TYPES} from '../../config';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Zoom} from '@mui/material';
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
                <StyledDrawerHeaderContainer>
                    <Zoom in={menuActive}>
                        <StyledIconButton
                            aria-label={formatMessage({id: 'header.closeMenu'})}
                            aria-expanded={menuActive}
                            onClick={closeMenu}
                            data-testid="close-menu-button">
                            <CloseIcon />
                        </StyledIconButton>
                    </Zoom>
                </StyledDrawerHeaderContainer>
                <NavLinkList active={menuActive} onClick={closeMenu}>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink to="/">
                            <FormattedMessage id="header.home" />
                        </StyledLink>
                    </NavLinkListItem>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink to={`/${MEDIA_TYPES.GAMES}/`}>
                            <FormattedMessage id="header.games" />
                        </StyledLink>
                    </NavLinkListItem>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink to={`/${MEDIA_TYPES.COMPANIES}/`}>
                            <FormattedMessage id="header.companies" />
                        </StyledLink>
                    </NavLinkListItem>
                    <NavLinkListItem active={menuActive}>
                        <StyledLink to={`/${MEDIA_TYPES.FRANCHISES}/`}>
                            <FormattedMessage id="header.franchises" />
                        </StyledLink>
                    </NavLinkListItem>
                </NavLinkList>
            </StyledDrawer>
            <StyledContainer>
                <StyledNav>
                    <Zoom in={!menuActive}>
                        <StyledIconButton
                            aria-label={formatMessage({id: 'header.openMenu'})}
                            aria-expanded={menuActive}
                            onClick={toggleMenu}
                            data-testid="open-menu-button">
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
