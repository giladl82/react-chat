import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '../../styles';
import { setActiveRoom } from '../../store/chat/actions';
import { joinRoom, onNewUserJoinedRoom } from '../../services/socket';

export default function Rooms() {
  const classes = useStyles();
  const chat = useSelector(state => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleNewUserJoinedRoom (data) {
      console.log(data)
    }
    onNewUserJoinedRoom(handleNewUserJoinedRoom)
  }, [])

  return (
    <Paper className={classes.paper}>
      <List component='nav'>
        {chat.rooms.map(room => {
          return (
            <ListItem
              key={room}
              button
              selected={chat.activeRoom === room}
              onClick={async () => {
                try {
                  await joinRoom(room);
                  dispatch(setActiveRoom(room));
                } catch (error) {
                }
              }}
            >
              <ListItemText>{room}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
