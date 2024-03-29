import {css, createGlobalStyle} from 'styled-components';

const Styles = createGlobalStyle`
    html, body {
        height: 100%;
        margin: 0;
        #root {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        li {
            display: block;
        }
    }
    a {
        text-decoration: none !important;
    }
`;

export const LoaderStyles = css`
    @keyframes loader-anim {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            opacity: 1;
        }
    }
    color: transparent;
    background-color: ${({theme}) => theme.palette.action.disabledBackground};
    animation: loader-anim 2s infinite;
`;

export default Styles;
