import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#7289da',
        },
        secondary: {
            main: '#99aab5',
        },
    },
    headerHeight: '4rem',
});

export default theme;
