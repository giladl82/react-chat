import { CREATE_ROOM, REMOVE_ROOM } from './action-types';

export const reducer = (state = ['global', 'sport'], action) => {
  switch (action.type) {
    case CREATE_ROOM:
      if (!state.includes(action.room)) {
        return [...state, action.room];
      }

      return state;
    case REMOVE_ROOM: {
      return state.filter(r => r !== action.room);
    }
    default:
      return state;
  }
};
