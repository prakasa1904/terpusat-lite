/*
 * action types
 */

export const INCREMENT_ID = 'INCREMENT_ID'

/*
 * action creators
 */

export function incrementId(id) {
  return { type: INCREMENT_ID, id }
}
