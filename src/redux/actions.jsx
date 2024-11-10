// src/redux/actions.js

// Action type constants
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

// Action creators
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const deleteMessage = (index) => ({
  type: DELETE_MESSAGE,
  payload: index,
});
