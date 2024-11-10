// src/redux/store.js
import { createStore } from 'redux';
import messageReducer from './reducer';

const store = createStore(messageReducer);

export default store;
