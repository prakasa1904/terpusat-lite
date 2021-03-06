import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import actions from './modules';

export default function configureStore(browserHistory) {
  const DEV = process.env.NODE_ENV !== 'production';
  const middleware = [thunk, routerMiddleware(browserHistory)];
  let composeEnhancers = compose;

  if (process.env.BROWSER && DEV) {
    if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionCreators: actions,
      });
    }
  }

  const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducers(require('./reducers').default);
    });
  }

  return store;
}
