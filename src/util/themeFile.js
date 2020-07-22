import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

const themeFile = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

export default themeFile;