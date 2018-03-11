import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

// RR3
//import { Router } from 'react-router';


const App = ({ client, store, routerProps }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        Nedya Amrih Prakasa
        {/* <Router {...routerProps} /> */}
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  client: object.isRequired,
  store: object.isRequired,
  routerProps: oneOfType([object, array]),
};

export default App;