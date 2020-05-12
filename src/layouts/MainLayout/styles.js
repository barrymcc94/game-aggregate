import styled from 'styled-components';
import Container from '@material-ui/core/Container';

export const StyledLayout = styled.div`
    flex: 1 0 auto;
    animation: info-load 0.5s linear;
    @keyframes info-load {
        0% {opacity: 0;transform: translateY(30px);}
        50% {opacity: 0.1;transform: translateY(30px);}
        100% {opacity: 1;transform: translateY(0px);}
    }
    padding-top: ${({theme}) => theme.headerHeight};
`;

export const StyledContainer = styled(Container)`
    height: 100%;
`;

export const StyledMain = styled.main`
    height: 100%;
`;