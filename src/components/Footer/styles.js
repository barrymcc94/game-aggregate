import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import {getBreakPoint} from '../../utils';

export const StyledFooter = styled.footer`
    flex-shrink: 0;
    margin-top: auto;
    width: 100%;
    text-align: center;
    background-color: ${({theme}) => theme.palette.background.paper};
    color: ${({theme}) => theme.palette.primary.contrastText};
`;

export const StyledFooterItems = styled(Container)`
    margin: auto;
`;

export const StyledFooterItem = styled.div`
    display: block;
    margin: 1rem 1rem;
    a {
        color: ${({theme}) => theme.palette.primary.contrastText};
    }
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        margin: 1.5rem 1rem;
        display: inline-block;
    }
`;