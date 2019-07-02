import React, { lazy, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { globalStyles } from '../../styles';
import { onNewMessage, clearOnNewMessage } from '../../services/socket';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const Rooms = lazy(() => import('./Rooms'));
const MessageForm = lazy(() => import('./MessageForm'));

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
  const activeRoom = useSelector(state => state.chat.activeRoom);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    function handleNewMessage(message) {
      setMessages(msgs => [...msgs, message]);

      setTimeout(() => {
        debugger;
        messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
      }, 10);
    }

    onNewMessage(handleNewMessage);

    return () => {
      clearOnNewMessage();
    };
  }, []);

  if (!user) {
    return <Redirect to='/auth' />;
  }

  return (
    <div className={classes.chat}>
      <Rooms />
      <Paper className={`${classes.paper}`}>
        <div className={classes.overflow} ref={messagesRef}>
          {messages.map(msg => (
            <div key={msg.date}>
              <Chip
                color={msg.user.id === user.id ? 'secondary' : 'default'}
                avatar={<Avatar alt={msg.user.name} src={`https://i.pravatar.cc/30?u=${msg.user.name}`} />}
                label={msg.text}
                className={classes.chip}
              />
            </div>
          ))}
        </div>
      </Paper>
      <MessageForm user={user} room={activeRoom} />
    </div>
  );
}
