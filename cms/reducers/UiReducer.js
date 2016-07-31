import createReducer from '../helpers/createReducer'
import { Map } from 'immutable'

export default (state = new Map({
  uuid: '',
  questionInput: '',
  searchInput: '',
  currentQuestion: '',
  keyboardHeight: 0,
  keyboardStatus: false,
  formatErrors: {
    startError: [],
    conjunctionError: []
  },
  route: {
    top: true,
    my: false,
    all: false
  }
}), action) => createReducer(state, action, {

  SET_ROUTE: (state, { ...a }) => state.set('route', {...a}),

  UPDATE_CARD_ANIMATION: (state, { pan, enter }) =>
    state.setIn(['cardAnimation', 'pan'], pan).setIn(['cardAnimation', 'enter'], enter),

  SET_QUESTION_TEXT: (state, { data }) =>
    state.set('questionInput', data),

  SET_SEARCH_TEXT: (state, { data }) =>
    state.set('searchInput', data),

  SET_CURRENT_QUESTION: (state, { _id }) =>
    state.set('currentQuestion', _id ),
  SET_UUID: (state, { uuid }) =>
    state.set('uuid', uuid),

  SET_KEYBOARD_HEIGHT: (state, { height }) =>
    state.set('keyboardHeight', height),

  KEYBOARD_TOGGLE: (state, { status }) =>
    state.set('keyboardStatus', status),

  ALERT_FORMAT_ERROR: (state, { errors }) =>
    state.mergeDeep({ formatErrors: { errors } }),

  OPEN_LIST_ITEM: (state, { data: { ...a } }) => (console.log(a),
    state)
})
