import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 1rem;

    input::-ms-clear {
        display: none;
        width: 0;
        height: 0;
    }
    input::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button,
    input::-webkit-search-results-button,
    input::-webkit-search-results-decoration {
        display: none;
    }
`;
