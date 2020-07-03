import {css, createGlobalStyle} from 'styled-components'

const Styles = createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: local('sans-serif'), local('sans-serif'),
            url('./static/fonts/Roboto-Light.ttf') format('truetype'),
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('sans-serif'), local('sans-serif'),
            url('./static/fonts/Roboto-Regular.ttf') format('truetype'),
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('sans-serif'), local('sans-serif'),
            url('./static/fonts/Roboto-Bold.ttf') format('truetype'),
    }

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
        padding: 0%;
        li {
            display: block;
        }
    }
    a {
        text-decoration: none;
    }
`;

export const LoaderStyles = css`
    @keyframes loader-anim {
        0% {opacity: 1;}
        50% {opacity: 0.4;}
        100% {opacity: 1;}
    }
    color: transparent;
    background-color: rgba(255, 255, 255, 0.13);
    animation: loader-anim 2s infinite;
`

export default Styles;