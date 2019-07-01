import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '../../styles';

export default function Rooms() {
  const classes = useStyles();
  const chats = useSelector(state => state.chats);
  const [activeChat, setActiveChat] = useState(chats[0]);

  return (
    <Paper className={classes.paper}>
      <List component="nav">
        {chats.map(ct => {
          return (
            <ListItem key={ct} button selected={activeChat === ct} onClick={event => {
              setActiveChat(ct)
            }}>
              <ListItemText>{ct}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
