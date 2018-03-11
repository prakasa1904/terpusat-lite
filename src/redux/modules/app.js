// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_TICKETS = 'UPDATE_TICKETS'

export const SELECTED_INVOICE = 'SELECTED_INVOICE'
export const SELECTED_SOLUTION = 'SELECTED_PROBLEM'

// ------------------------------------
// Actions
// ------------------------------------

export function updatePageTicket(page) {
  return {
	type: UPDATE_PAGE,
	payload: page
  }
}

export function updateStatusTicket(status) {
  return {
    type: UPDATE_FILTER,
    payload: status
  }
}

export function updateTicketList(tickets) {
  return {
    type: UPDATE_TICKETS,
    payload: tickets
  }
}

export function updateSelectedInvoice(data) {
  return {
    type: SELECTED_INVOICE,
    payload: data,
  }
}

export function updateSelectedSolution(data) {
  return {
    type: SELECTED_SOLUTION,
    payload: data,
  }
}

export const actions = {
  updatePageTicket,
  updateStatusTicket,
  updateTicketList,
  updateSelectedInvoice,
  updateSelectedSolution,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_PAGE]: (state, action) => Object.assign({}, state, { pageTicket: action.payload }),
  [UPDATE_FILTER]: (state, action) => Object.assign({}, state, { statusTicket: action.payload }),
  [UPDATE_TICKETS]: (state, action) => {
    return Object.assign({}, state, { ticketList: action.payload })
  },
  [SELECTED_INVOICE]: (state, action) => Object.assign({}, state, { selectedInvoice: action.payload }),
  [SELECTED_SOLUTION]: (state, action) => Object.assign({}, state, { selectedSolution: action.payload }),
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pageTicket: 1,
  statusTicket: 0,
  ticketList: [],
  selectedInvoice: [],
  selectedSolution: [],
}

export default function HelpCenterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
