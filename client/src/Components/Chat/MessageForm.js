import React, { useState } from 'react';
import { globalStyles } from '../../styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { sendMessage } from '../../services/socket';
const chatStyles = makeStyles({
  ...globalStyles,
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

export default function MessageForm({ user, room }) {
  const [inputValue, setInputValue] = useState('');
  const classes = chatStyles();

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleMessageSubmit = () => {
    if (inputValue) {
      sendMessage({
        user,
        room,
        text: inputValue,
        date: new Date()
      });
    }
  };

  return (
    <Paper className={`${classes.paper} ${classes.flex} ${classes.messageContainer}`}>
      <InputBase
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={event => {
          if (event.keyCode === 13) {
            handleMessageSubmit();
          }
        }}
        className={`${classes.flexGrow} ${classes.inputBase}`}
      />
      <Button variant='contained' color='primary' onClick={handleMessageSubmit}>
        שליחה
      </Button>
    </Paper>
  );
}
