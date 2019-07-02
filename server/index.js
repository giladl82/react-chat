const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.port || '3001';
let users = [];

io.on('connection', function(socket) {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
    current = users.find(user => user.id === socket.id);
    if (current) {
      current.connected = false;
    }

    setTimeout(() => {
      users = users.filter(u => u.connected);
    }, 15000);
  });

  socket.on('reset_user_id', updated => {
    let current;

    current = users.find(user => user.name === updated.name && user.id === updated.id);
    if (current) {
      current.id = socket.id;
      current.connected = true;
    }

    io.to(socket.id).emit('reset_user_id_response', {
      success: Boolean(current)
    });
  });

  socket.on('validate_user', userName => {
    if (users.find(user => user.id !== socket.id && user.name === userName)) {
      io.to(socket.id).emit('validate_user_response', {
        success: false,
        error: 'user name is in use'
      });

      socket.disconnect(true);
    } else {
      users.push({
        id: socket.id,
        name: userName
      });

      socket.userName = userName;

      io.to(socket.id).emit('validate_user_response', {
        success: true,
        id: socket.id,
        name: userName
      });
    }
  });

  socket.on('join_room', room => {
    socket.join(room, () => {
      const user = users.find(u => u.id === socket.id);
      if (user) {
        if (user.currentRoom) {
          socket.leave(user.currentRoom);
          socket.to(room).emit('user_left_room', {
            name: user.name,
            room: user.currentRoom
          });
        }
        user.currentRoom = room;
        socket.to(room).emit('user_joined_room', {
          name: user.name,
          room
        });
        io.to(socket.id).emit('join_room_response', {
          success: true
        });
      } else {
        socket.disconnect();
      }
    });
  });

  socket.on('message_sent', message => {
    console.log('message_sent', message);
    io.to(message.room).emit('new_message', message);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
