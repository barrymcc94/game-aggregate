import styled from 'styled-components';
import {Typography} from '@material-ui/core';

export const StyledHeading = styled(Typography)`
    margin-top: 1rem;
    color: ${({theme}) => theme.palette.text.primary};
`;
