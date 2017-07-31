import { 
  createStore,
  combineReducers, 
  applyMiddleware, 
  compose 
} from 'redux'
import thunk from 'redux-thunk'
import terpusatApps from './reducers'

const DEV = process.env.NODE_ENV !== 'production'

const middleware = [
  thunk,
]

let enhancers = [
  applyMiddleware(...middleware),
]

if (DEV) {
  console.log('REDUX DEBUGER')
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : noop => noop)
}

const store = createStore(
  terpusatApps,
  window.STATE_FROM_SERVER,
  compose(...enhancers)
)

if (module.hot) {
  console.log('HOT MODULE REDUX')
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer(apolloClient))
  })
}
export default store
