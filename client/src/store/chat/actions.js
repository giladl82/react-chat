import { CREATE_ROOM, REMOVE_ROOM, SET_ACTIVE_ROOM } from './action-types';

export const createRoom = room => ({
  type: CREATE_ROOM,
  room
});

export const removeRoom = room => ({
  type: REMOVE_ROOM,
  room
});

export const setActiveRoom = room => ({
  type: SET_ACTIVE_ROOM,
  room
});
