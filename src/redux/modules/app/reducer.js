import { TOASTER_SHOW, TOASTER_DISMISS, TOASTER_CLOSING } from './actions';

const actionHandlers = {
  [TOASTER_SHOW]: (state, payload) => ({
    ...initialState,
    ...payload,
    display: true,
  }),

  [TOASTER_CLOSING]: (state, payload) => ({
    ...state,
    closingAction: payload,
  }),

  [TOASTER_DISMISS]: state => ({
    ...state,
    display: false,
  }),
};

const initialState = {
  actionText: null,
  className: null,
  closing: 0,
  display: false,
  error: false,
  onActionClick: function() {},
  text: '',
};

const appReducer = (state = initialState, { type, payload }) => {
  return actionHandlers.hasOwnProperty(type) ? actionHandlers[type](state, payload) : state;
};

export default appReducer;
