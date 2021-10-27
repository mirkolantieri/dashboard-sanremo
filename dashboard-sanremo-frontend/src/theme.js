import { createMuiTheme } from "@material-ui/core/styles";
import green from '@material-ui/core/colors/green';

// Theme
// Override Material UI components

export default createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: '#fff',
        backgroundColor: green[500]
      }
    }
  }
});