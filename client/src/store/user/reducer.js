import { SET_USER } from './action-types';

export const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
