import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import {getBreakPoint} from '../../utils';

export const StyledFooter = styled.footer`
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: ${({theme}) => theme.palette.background.paper};
    color: ${({theme}) => theme.palette.primary.contrastText};
    height: ${({theme}) => theme.footerHeightSm};
    line-height: initial;
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        height: ${({theme}) => theme.footerHeight};
        line-height: ${({theme}) => theme.footerHeight};
    }
`;

export const StyledFooterItems = styled(Container)`
    margin: auto;
`;

export const StyledFooterItem = styled.div`
    margin-top: 1rem;
    display: block;
    a {
        color: ${({theme}) => theme.palette.primary.contrastText};
    }
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        margin: 0 1rem;
        display: inline-block;
    }
`;