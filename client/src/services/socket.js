import io from 'socket.io-client';

let socket;

const CHAT_ID_KEY = 'chat_id';
const CHAT_NAME_KEY = 'chat_user_name';

const eventTypes = {
  connect: 'connect',
  reset_user_id_response: 'reset_user_id_response',
  reset_user_id: 'reset_user_id',
  validate_user: 'validate_user',
  user_joined_room: 'user_joined_room',
  validate_user_response: 'validate_user_response',
  join_room: 'join_room',
  join_room_response: 'join_room_response',
  message_sent: 'message_sent',
  new_message: 'new_message',
  user_left_room: 'user_left_room'
};

export const init = async port => {
  return new Promise((resolve, reject) => {
    socket = io(':' + port);

    socket.on(eventTypes.connect, () => {
      const id = window.sessionStorage.getItem(CHAT_ID_KEY);
      const name = window.sessionStorage.getItem(CHAT_NAME_KEY);
      if (name && id) {
        socket.emit(eventTypes.reset_user_id, {
          id,
          name
        });
      }
    });

    socket.on(eventTypes.reset_user_id_response, response => {
      if (response.success) {
        const name = window.sessionStorage.getItem(CHAT_NAME_KEY);
        window.sessionStorage.setItem(CHAT_ID_KEY, socket.id);

        resolve({
          id: socket.id,
          name
        });
      } else {
        window.sessionStorage.removeItem(CHAT_ID_KEY);
        window.sessionStorage.removeItem(CHAT_NAME_KEY);
        resolve(null);
      }
    });
  });
};

export const validateUser = name => {
  if (socket) {
    socket.emit(eventTypes.validate_user, name);

    return new Promise((resolve, reject) => {
      socket.once(eventTypes.validate_user_response, response => {
        if (response.success) {
          window.sessionStorage.setItem(CHAT_ID_KEY, socket.id);
          window.sessionStorage.setItem(CHAT_NAME_KEY, name);
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  }
};

export const joinRoom = room => {
  if (socket) {
    socket.emit(eventTypes.join_room, room);

    return new Promise((resolve, reject) => {
      socket.once(eventTypes.join_room_response, response => {
        if (response.success) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  }
};

export const sendMessage = message => {
  socket.emit(eventTypes.message_sent, message);
};

export const onNewUserJoinedRoom = handler => {
  socket.on(eventTypes.user_joined_room, response => {
    handler(response);
  });
};

export const onNewMessage = handler => {
  socket.on(eventTypes.new_message, message => {
    handler(message);
  });
};

export const clearOnNewMessage = () => {
  socket.off(eventTypes.new_message);
};
