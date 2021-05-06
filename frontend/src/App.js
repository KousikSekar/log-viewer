import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Main from './components/Main';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
// }));

const App = () => {
  // const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography style={{ paddingLeft: '18px' }} variant="h6" color="inherit">
            Log Viewer
                    </Typography>
        </Toolbar>
      </AppBar>
      <Main />
    </div>

  );
}

export default App;