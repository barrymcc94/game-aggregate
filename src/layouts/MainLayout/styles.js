import styled from 'styled-components';
import {getBreakPoint} from '../../utils';

export const StyledLayout = styled.div`
    animation: info-load 0.5s linear;
    @keyframes info-load {
        0% {opacity: 0;transform: translateY(30px);}
        50% {opacity: 0.1;transform: translateY(30px);}
        100% {opacity: 1;transform: translateY(0px);}
    }
    padding-top: ${({theme}) => theme.headerHeight};
    padding-bottom: ${({theme}) => theme.footerHeightSm};
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        padding-bottom: ${({theme}) => theme.footerHeight};
    }
`;

export const StyledMain = styled.main``;