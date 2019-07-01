import { createStore, compose } from 'redux';
import { reducers } from './reducers';

export const store = createStore(
  reducers,
  undefined,
  compose(
    typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);