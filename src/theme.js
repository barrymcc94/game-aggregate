import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#A5C9FF',
            light: 'rgb(183, 211, 255)',
            dark: 'rgb(115, 140, 178)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        secondary: {
            main: '#99AAB5',
            light: 'rgb(173, 187, 195)',
            dark: 'rgb(107, 118, 126)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            hint: 'rgba(255, 255, 255, 0.5)',
            icon: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        background: {
            paper: '#424242',
            default: '#303030',
        },
    },
    headerHeight: '4rem',
});

export default theme;
