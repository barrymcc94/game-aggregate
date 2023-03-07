import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const ErrorSection = styled.section``;

export const ErrorHeader = styled.h1`
    padding-top: 5rem;
    font-size: 2.25rem;
    text-align: center;
`;

export const ErrorText = styled.div`
    margin-top: 2rem;
    font-size: 1.25rem;
    text-align: center;
`;

export const StyledLink = styled(Link)`
    color: ${({theme}) => theme.palette.primary.main};
`;
