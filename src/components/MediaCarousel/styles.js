import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import {css} from 'styled-components';

const buttonStyles = css`
    z-index: 5;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    background-color: #0000006e;
    padding: 0.5rem;
    &:hover,
    &:focus {
        background-color: #0000008e;
    }
    svg {
        height: 4rem;
        width: 4rem;
    }
`;

export const PrevButton = styled(IconButton)`
    ${buttonStyles}
    left: 0;
`;

export const NextButton = styled(IconButton)`
    ${buttonStyles}
    right: 0;
`;

export const ListItem = styled.li`
    padding-right: 1rem;
    list-style: none;
    &:last-child {
        padding-right: 0rem;
    }
`;
