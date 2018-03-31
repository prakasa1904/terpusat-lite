/**
 * This function will help handle response with generic pattern .
 *
 * @param  {String} type:
 *   Type of redux action
 *
 * @return {action function}
 *   Return value will be redux action function
 *
 * @example
 *   const actionDispatcher = actionCreator(ACTION_CONSTANT)
 */

export default function makeActionCreator(type) {
  return function(payload) {
    return {
      type,
      payload,
    };
  };
}
