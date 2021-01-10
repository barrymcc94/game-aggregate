import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

export const StyledLoaderContainer = styled.div`
    margin: 1rem 0;
    width: 100%;
    text-align: center;
`;

export const StyledLoader = styled(CircularProgress)``;

export const StyledAriaLoader = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    white-space: nowrap;
`;
