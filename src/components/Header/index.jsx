import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {MenuIcon, CloseIcon, StyledHeader, StyledNav, StyledContainer, StyledNavLinkList, StyledNavLinkListItem, StyledIconButton, StyledLink} from './styles.js';
import Zoom from '@material-ui/core/Zoom';
import throttle from 'lodash.throttle';

export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuActive: false,
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState({menuActive: !this.state.menuActive})
    }

    closeMenu() {
        if (this.state.menuActive) {
            this.setState({menuActive: false});
        }
    }

    throttleCloseMenu = throttle(() => {
        this.closeMenu()
    }, 1000);

    componentDidMount() {
        window.addEventListener('resize', this.throttleCloseMenu)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.throttleCloseMenu)
    }

    componentDidUpdate() {
        if (this.state.menuActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {menuActive} = this.state;
        return (
            <StyledHeader>
                <StyledContainer maxWidth="lg">
                    <StyledNav onClick={this.closeMenu}>
                        {menuActive
                            ? <Zoom in={menuActive} aria-label={formatMessage({id: "header.closeMenu"})}>
                                <StyledIconButton onClick={this.toggleMenu}>
                                    <CloseIcon />
                                </StyledIconButton>
                            </Zoom>
                            : <Zoom in={!menuActive} aria-label={formatMessage({id: "header.openMenu"})}>
                                <StyledIconButton onClick={this.toggleMenu}>
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
}

Header.propTypes = {
    intl: PropTypes.object,
}

export default injectIntl(Header);
