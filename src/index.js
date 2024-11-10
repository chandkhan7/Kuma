// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store'; // Import the store you created
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Import your custom CSS

ReactDOM.render(
  <Provider store={store}>  {/* Wrap your App component with Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);
