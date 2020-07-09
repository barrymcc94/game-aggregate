import styled, {css} from 'styled-components';
import {Container, IconButton} from '@material-ui/core';
import {Menu, Close} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';
import {getBreakPoint} from '../../utils';

export const StyledHeader = styled.header`
    background-color: ${({theme}) => theme.palette.background.paper};
    color: ${({theme}) => theme.palette.text.primary};
    text-transform: capitalize;
    height: ${({theme}) => theme.headerHeight};
    width: 100%;
    z-index: 9999;
    position: fixed;
    top: 0;
`;

const baseMenuStyles = css`
    font-size: 3rem;
    display: flex;
    align-self: center;
    cursor: pointer;
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        display: none;
        align-self: normal;
    }
`;

export const MenuIcon = styled(Menu)`${baseMenuStyles}`;

export const CloseIcon = styled(Close)`${baseMenuStyles}`;

export const StyledContainer = styled(Container)`
    height: ${({theme}) => theme.headerHeight};
`;

export const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    height: 100%;
    margin: auto;
    line-height: ${({theme}) => theme.headerHeight};
    padding: 0;
`;

export const StyledIconButton = styled(IconButton)`
    padding: 0;
    color: ${({theme}) => theme.palette.text.primary};
    display: initial;
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        display: none;
    }
`;

export const StyledNavLinkList = styled.ul`
    overflow: hidden;
    width: 100%;
    max-height: none;
    height: 0;
    position: absolute;
    transition: height, 0.1s ease-out;
    top: ${({theme}) => theme.headerHeight};
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    ${({active}) => active ? css`
        transition: height, 0.1s ease-in;
        height: calc(100vh - ${({theme}) => theme.headerHeight});
        overflow: auto;
    ` : ``};
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        height: 100%;
        position: relative;
        transition: height, 0s;
        top: 0;
        background-color: rgba(0, 0, 0, 0);
        ${({active}) => active ? css`
            height: auto;
    ` : ``};
    }
`;

export const StyledNavLinkListItem = styled.li`
    background-color: ${({theme}) => theme.palette.background.paper};
    display: ${({active}) => active ? 'block' : 'none'};
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        display: inline-block;
    }
`

export const StyledLink = styled(NavLink)`
    display: block;
    text-align: left;
    font-size: 1.4rem;
    color: ${({theme}) => theme.palette.text.primary};
    padding: 0 1rem;
    box-sizing: border-box;
    &.active {
        background-color: ${({theme}) => theme.palette.action.hover};
    }
    &:hover, &:focus {
        outline: none;
        text-decoration: none;
        background-color: ${({theme}) => theme.palette.action.hover};
    }
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        display: inline-block;
        text-align: center;
    }
`;