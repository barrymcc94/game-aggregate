import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {MenuIcon, CloseIcon, StyledHeader, StyledNav, StyledContainer, StyledNavLinkList, StyledNavLinkListItem, StyledIconButton, StyledLink} from './styles.js';
import Zoom from '@material-ui/core/Zoom';
import throttle from 'lodash.throttle';

export const Header = ({intl: {formatMessage}}) => {
    const [menuActive, setMenuActive] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', throttleCloseMenu);
        return () => {
            window.removeEventListener('resize', throttleCloseMenu);
        }
    });

    useEffect(() => {
        if (menuActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuActive]);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    }

    const closeMenu = () => {
        if (menuActive) {
            setMenuActive(false);
        }
    }

    const throttleCloseMenu = throttle(() => {
        closeMenu();
    }, 1000);

    return (
        <StyledHeader>
            <StyledContainer maxWidth="lg">
                <StyledNav onClick={closeMenu}>
                    {menuActive
                        ? <Zoom in={menuActive} aria-label={formatMessage({id: "header.closeMenu"})}>
                            <StyledIconButton onClick={toggleMenu}>
                                <CloseIcon />
                            </StyledIconButton>
                        </Zoom>
                        : <Zoom in={!menuActive} aria-label={formatMessage({id: "header.openMenu"})}>
                            <StyledIconButton onClick={toggleMenu}>
                                <MenuIcon />
                            </StyledIconButton>
                        </Zoom>}
                    <StyledNavLinkList active={menuActive}>
                        <StyledNavLinkListItem active={menuActive}>
                            <StyledLink to="/">
                                <FormattedMessage id="header.home" defaultMessage="Home" />
                            </StyledLink>
                        </StyledNavLinkListItem>
                        <StyledNavLinkListItem active={menuActive}>
                            <StyledLink to="/about">
                                <FormattedMessage id="header.about" defaultMessage="About" />
                            </StyledLink>
                        </StyledNavLinkListItem>
                    </StyledNavLinkList>
                </StyledNav>
            </StyledContainer>
        </StyledHeader>
    );
}

Header.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(Header);
