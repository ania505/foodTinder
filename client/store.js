import { createStore, applyMiddleware } from 'redux';
import yourReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


// action types


// action creators + thunks


// initial store


//reducer
const store = createStore(
  yourReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;