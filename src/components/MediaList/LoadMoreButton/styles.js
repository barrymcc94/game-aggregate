import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {getBreakPoint} from '../../../utils';

export const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
`;

export const StyledButton = styled(Button)`
    text-transform: none;
    font-size: 1.25rem;
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'xs')}) {
        width: 100%;
    }
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        width: initial;
    }
`;
