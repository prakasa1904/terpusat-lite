/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */

import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
//import { browserHistory, match } from 'react-router'; // Router, Route, Switch
import { AppContainer as HotEnabler } from 'react-hot-loader';
import 'intersection-observer';

// import configureStore from './redux/configure';
// import getRoutes from './routes';
import App from './App';

const MOUNT_NODE = document.getElementById('content');
// const store = configureStore();
// const routes = getRoutes();

const render = (App, routerProps) => {
  hydrate(
    <HotEnabler>
      <App client={client} routerProps={routerProps} store={store} />
    </HotEnabler>,
    MOUNT_NODE,
  );
};

Loadable.preloadReady().then(() => {
  const { app } = store.getState();
  //const matchOptions = { history, routes };

  render(App, {});

  // match(matchOptions, (error, redirectLocation, renderProps) => {
  //   render(App, renderProps);
  // });
});

if (module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./client.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./App', () => {
    render(require('./App'));
  });
}
