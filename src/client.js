import React from 'react';
import { hydrate } from 'react-dom';
import { match } from 'react-router';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './redux/configure';
import App from './App';

// initial state and routing
const history = createHistory();
const store = configureStore(history);

const render = () => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('terpusat'),
  );
};

Loadable.preloadReady().then(() => {
  render();
});

if (module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./client.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./App', () => {
    render(require('./App'));
  });
}
