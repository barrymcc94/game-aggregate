import {createGlobalStyle} from 'styled-components'

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
            min-height: 100%;
            position: relative;
        }
    }
    main {
        margin: 1rem 0;
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

export default Styles;