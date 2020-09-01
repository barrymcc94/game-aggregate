import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
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
    StyledNavLinkList,
    StyledNavLinkListItem,
    StyledIconButton,
    StyledLink,
} from './styles.js';

const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuActive: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState({menuActive: !this.state.menuActive});
    }

    closeMenu() {
        if (this.state.menuActive) {
            this.setState({menuActive: false});
        }
    }

    throttleCloseMenu = throttle(() => {
        this.closeMenu();
    }, 1000);

    componentDidMount() {
        window.addEventListener('resize', this.throttleCloseMenu);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.throttleCloseMenu);
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
                <AuthModalContainer />
                <StyledContainer maxWidth="lg">
                    <StyledNav onClick={this.closeMenu}>
                        {menuActive ? (
                            <Zoom in={menuActive}>
                                <StyledIconButton
                                    aria-label={formatMessage({
                                        id: 'header.closeMenu',
                                        defaultMessage: 'close',
                                    })}
                                    aria-expanded={menuActive}
                                    onClick={this.toggleMenu}>
                                    <CloseIcon />
                                </StyledIconButton>
                            </Zoom>
                        ) : (
                            <Zoom in={!menuActive}>
                                <StyledIconButton
                                    aria-label={formatMessage({
                                        id: 'header.openMenu',
                                        defaultMessage: 'open',
                                    })}
                                    aria-expanded={menuActive}
                                    onClick={this.toggleMenu}>
                                    <MenuIcon />
                                </StyledIconButton>
                            </Zoom>
                        )}
                        <StyledNavLinkList active={menuActive}>
                            <StyledNavLinkListItem active={menuActive}>
                                <StyledLink exact to="/">
                                    <FormattedMessage
                                        id="header.home"
                                        defaultMessage="Home"
                                    />
                                </StyledLink>
                            </StyledNavLinkListItem>
                            <StyledNavLinkListItem active={menuActive}>
                                <StyledLink exact to={`/${GAMES}/`}>
                                    <FormattedMessage
                                        id="header.games"
                                        defaultMessage="Games"
                                    />
                                </StyledLink>
                            </StyledNavLinkListItem>
                            <StyledNavLinkListItem active={menuActive}>
                                <StyledLink exact to={`/${COMPANIES}/`}>
                                    <FormattedMessage
                                        id="header.companies"
                                        defaultMessage="Companies"
                                    />
                                </StyledLink>
                            </StyledNavLinkListItem>
                            <StyledNavLinkListItem active={menuActive}>
                                <StyledLink exact to={`/${FRANCHISES}/`}>
                                    <FormattedMessage
                                        id="header.franchises"
                                        defaultMessage="Franchises"
                                    />
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
};

export default injectIntl(Header);
