import styled, {css} from 'styled-components';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import {Menu, Close} from '@mui/icons-material';
import {NavLink} from 'react-router-dom';

export const StyledHeader = styled.header`
    background-color: ${({theme}) => theme.palette.background.paper};
    color: ${({theme}) => theme.palette.text.primary};
    text-transform: capitalize;
    height: ${({theme}) => theme.headerHeight};
    width: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
`;

const baseMenuStyles = css`
    font-size: 2rem;
    display: flex;
    align-self: center;
    cursor: pointer;
`;

export const MenuIcon = styled(Menu)`
    ${baseMenuStyles}
`;

export const CloseIcon = styled(Close)`
    ${baseMenuStyles}
`;

export const StyledContainer = styled(Container)`
    height: ${({theme}) => theme.headerHeight};
    position: relative;
    max-width: 100%;
`;

export const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: auto;
    line-height: ${({theme}) => theme.headerHeight};
    padding: 0;
`;

export const StyledIconButton = styled(IconButton)`
    padding: 0.5rem;
    margin: auto 0;
    color: ${({theme}) => theme.palette.text.primary};
    display: initial;
`;

export const NavLinkList = styled.ul`
    overflow: hidden;
    width: 100%;
    max-height: none;
`;

export const NavLinkListItem = styled.li``;

export const StyledLink = styled(NavLink)`
    display: block;
    text-align: left;
    font-size: 1.4rem;
    color: ${({theme}) => theme.palette.text.primary};
    box-sizing: border-box;
    padding: 0.35rem 1rem;
    ${({theme}) => theme.breakpoints.up('sm')} {
        padding: 0.35rem 1.5rem;
    }
    &.active {
        background-color: ${({theme}) => theme.palette.background.paper};
    }
    &:hover,
    &:focus {
        outline: none;
        text-decoration: none;
        background-color: ${({theme}) => theme.palette.background.paper};
    }
`;

export const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        width: 100%;
        ${({theme}) => theme.breakpoints.up('sm')} {
            width: 25rem;
        }
    }
`;

export const StyledDrawerHeaderContainer = styled(Container)`
    height: ${({theme}) => theme.headerHeight};
    position: relative;
    display: flex;
    max-width: 100%;
`;
