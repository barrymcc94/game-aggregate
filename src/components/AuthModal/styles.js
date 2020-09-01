import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getBreakPoint} from '../../utils';

export const StyledModalContent = styled.div`
    background-color: ${({theme}) => theme.palette.background.default};
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    min-width: calc(100% - 1rem);
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'sm')}) {
        min-width: 50%;
    }
`;

export const Heading = styled(Typography)``;

export const Text = styled(Typography)`
    margin-bottom: 1rem;
`;

export const TextFieldWrapper = styled.div`
    position: relative;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

export const SuccessText = styled.span`
    color: ${({theme}) => theme.palette.success.main};
`;

export const ProgressSpinner = styled(CircularProgress)`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
`;
