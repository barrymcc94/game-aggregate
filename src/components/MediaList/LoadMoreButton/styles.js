import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
`;

export const StyledButton = styled(Button)`
    text-transform: none;
    font-size: 1.25rem;
    ${({theme}) => theme.breakpoints.up('xs')} {
        width: 100%;
    }
    ${({theme}) => theme.breakpoints.up('sm')} {
        width: initial;
    }
`;
