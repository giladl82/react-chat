import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles';
import { validateUser } from '../services/socket';
import { setUser } from '../store/user/actions';

export default function Login() {
  const classes = useStyles();
  const [textValue, setTextValue] = useState('גלעד לב-ארי');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1" color="inherit">
          הזן את שם המשתמש איתו תרצה להזדהות
        </Typography>
        <form noValidate autoComplete="off" className={`${classes.flex} ${classes.flexGrow}`}>
          <TextField
            id="name"
            label="שם משתמש"
            className={classes.flexGrow}
            InputLabelProps={{
              className: classes.textLabel
            }}
            margin="normal"
            value={textValue}
            onChange={event => {
              setTextValue(event.target.value);
            }}
            required
          />
          <div className={`${classes.vEnd} ${classes.hSpaced}`}>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                if (textValue) {
                  try {
                    const resp = await validateUser(textValue);
                    if (resp.success) {
                      dispatch(
                        setUser({
                          id: resp.id,
                          name: resp.name
                        })
                      );
                    }
                  } catch (error) {
                    alert(error);
                  }
                }
              }}
            >
              כניסה
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
