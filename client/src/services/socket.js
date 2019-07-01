import io from 'socket.io-client';

let socket;
const listeners = [];

const CHAT_ID_KEY = 'chat_id';
const CHAT_NAME_KEY = 'chat_user_name';

export const init = async port => {
  return new Promise((resolve, reject) => {
    socket = io(':' + port);

    socket.on('connect', () => {
      const id = window.sessionStorage.getItem(CHAT_ID_KEY);
      const name = window.sessionStorage.getItem(CHAT_NAME_KEY);
      if (name && id) {
        socket.emit('reset_user_id', {
          id,
          name
        });
      }
    });

    socket.on('reset_user_id_response', response => {
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
    socket.emit('validate_user', name);

    return new Promise((resolve, reject) => {
      const eventName = 'validate_user_response';
      if (!listeners.includes(eventName)) {
        listeners.push(eventName);
        socket.on(eventName, response => {
          if (response.success) {
            window.sessionStorage.setItem(CHAT_ID_KEY, socket.id);
            window.sessionStorage.setItem(CHAT_NAME_KEY, name);
            resolve(response);
          } else {
            reject(response.error);
          }
        });
      }
    });
  }
};
