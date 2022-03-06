import styled from 'styled-components';
import Container from '@mui/material/Container';

export const StyledFooter = styled.footer`
    flex-shrink: 0;
    margin-top: auto;
    width: 100%;
    text-align: center;
    background-color: ${({theme}) => theme.palette.background.paper};
    color: ${({theme}) => theme.palette.text.primary};
`;

export const StyledFooterItems = styled(Container)`
    margin: auto;
    max-width: 100%;
`;

export const StyledFooterItem = styled.div`
    display: block;
    margin: 1rem 1rem;
    a {
        color: ${({theme}) => theme.palette.text.primary};
    }
    ${({theme}) => theme.breakpoints.up('sm')} {
        margin: 1.5rem 1rem;
        display: inline-block;
    }
`;
