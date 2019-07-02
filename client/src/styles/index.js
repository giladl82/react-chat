import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/teal';

export const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary,
    secondary: {
      light: secondary.A200,
      main: secondary[500],
      dark: secondary.A700
    }
  }
});

export const globalStyles = {
  root: {
    flexGrow: 1
  },
  flex: {
    display: 'flex'
  },
  container: {
    margin: '30px 0'
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  flexGrow: {
    flexGrow: 1
  },
  hSpaced: {
    marginRight: 10,
    marginLeft: 10
  },
  vCentered: {
    alignSelf: 'center'
  },
  vEnd: {
    alignSelf: 'flex-end'
  },
  textLabel: {
    left: 'auto',
    right: 0
  },
  chip: {
    margin: theme.spacing(1),
  },
  overflow: {
    overflow: 'auto',
    maxHeight: '100%'
  }
}

export const useStyles = makeStyles(globalStyles);
