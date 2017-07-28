import { createStore } from 'redux'
import terpusatApps from './reducers'

const store = createStore(terpusatApps, window.STATE_FROM_SERVER)

export const { dispatch, getState } = store
export default store
