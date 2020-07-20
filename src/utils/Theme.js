import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

// A custom theme for this app
const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A700,
        },
        background: {
            default: '#fff',
        },
        card: {
            background: '#fafafa',
        },
        text: {
            default: '#212529',
        }
    },
});

export default Theme;