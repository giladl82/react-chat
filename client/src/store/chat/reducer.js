import { CREATE_ROOM, REMOVE_ROOM, SET_ACTIVE_ROOM } from './action-types';

const initialState = {
  rooms: ['global', 'sports'],
  activeRoom: 'global'
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM:
      if (!state.includes(action.room)) {
        return {
          ...state,
          rooms: [...state.rooms, action.room]
        };
      }

      return state;

    case REMOVE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(r => r !== action.room)
      };

    case SET_ACTIVE_ROOM:
      return {
        ...state,
        activeRoom: action.room
      };

    default:
      return state;
  }
};
