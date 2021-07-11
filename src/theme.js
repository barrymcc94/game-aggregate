import {createTheme} from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#A5C9FF',
        },
        secondary: {
            main: '#99AAB5',
        },
    },
    headerHeight: '4rem',
});

export default theme;
