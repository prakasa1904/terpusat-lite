import { combineReducers } from 'redux'
import {
  INCREMENT_ID
} from './actions'

const initialState = {
  id: 0,
}

function mainApps(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_ID:
      return {...state, ...{id: action.id}}
    default:
      return state
  }
}

const reducers = combineReducers(
  {
    main: mainApps
  }
)

export default reducers
