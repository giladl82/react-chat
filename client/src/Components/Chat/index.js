import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { globalStyles } from '../../styles';

import Rooms from './Rooms'

const chatStyles = makeStyles({
  ...globalStyles,
  chat: {
    display: 'grid',
    gridTemplateColumns: '3fr 7fr',
    gridTemplateRows: 'calc(100vh - 230px) 95px',
    gridColumnGap: 10,
    gridRowGap: 10
  },
  messageContainer: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    backgroundColor: '#eee'
  },
  inputBase: {
    backgroundColor: '#fff',
    padding: '2px 8px',
    marginLeft: 10
  }
});

export default function Chat() {
  const classes = chatStyles();
  const user = useSelector(state => state.user);
  console.log(classes.paper);

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className={classes.chat}>
      <Rooms />
      <Paper className={classes.paper}>This is the chat page</Paper>
      <Paper className={`${classes.paper} ${classes.flex} ${classes.messageContainer}`}>
        <InputBase className={`${classes.flexGrow} ${classes.inputBase}`} />
        <Button variant="contained" color="primary" >
          שליחה
        </Button>
      </Paper>
    </div>
  );
}
