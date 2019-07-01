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
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
