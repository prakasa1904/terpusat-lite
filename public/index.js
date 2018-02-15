import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './style/google-material-color/palette.css';
import './style/material-design-iconic-font/css/material-design-iconic-font.css';
import './style/app.css';
import store from './../store';
import App from './container/AppContainer';

const MOUNT_NODE = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Development render functions
  const renderApp = render;
  const renderError = error => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };

  // Wrap render in try/catch
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };
}

render();
