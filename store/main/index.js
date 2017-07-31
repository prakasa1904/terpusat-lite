/*
 * action types
 */

export const INCREMENT_ID = 'INCREMENT_ID'

/*
 * action creators
 */

export const increaseID = (id) => {
  return { type: INCREMENT_ID, id }
}

/*
 * initial state
 */
const initialState = {
  id: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_ID:
      return {...state, ...{id: action.id}}
    default:
      return state
  }
}