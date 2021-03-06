import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { theme, useStyles } from '../styles';
import { init as initSocket, joinRoom } from '../services/socket';
import { setUser } from '../store/user/actions';

const Header = lazy(() => import('./Header'));
const Login = lazy(() => import('./Login'));
const Chat = lazy(() => import('./Chat'));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { activeRoom } = useSelector(state => state.chat);
  useEffect(() => {
    const init = async () => {
      try {
        const user = await initSocket(3001);
        
        await joinRoom(activeRoom);

        if (user) {
          dispatch(setUser(user));
        }
      } catch (error) {}
    };

    init();
  }, [activeRoom, dispatch]);

  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header />
          <Router>
            <Container maxWidth='xl' className={classes.container}>
              <Route exact path='/' component={Chat} />
              <Route exact path='/auth' component={Login} />
            </Container>
          </Router>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
