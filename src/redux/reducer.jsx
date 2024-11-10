// src/redux/reducer.js

import { ADD_MESSAGE, DELETE_MESSAGE } from './actions';

const initialState = {
  messages: []
};

// Reducer to handle adding and deleting messages
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case DELETE_MESSAGE:
      return { 
        ...state, 
        messages: state.messages.filter((_, index) => index !== action.payload)
      };
    default:
      return state;
  }
};

export default messageReducer;
