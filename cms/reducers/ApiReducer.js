import createReducer from '../helpers/createReducer'
import { Map } from 'immutable'

export default (state = new Map({
  allQuestions: {
    errors: [],
    data: [],
    status: ''
  },
  topQuestions: {
    errors: [],
    data: [],
    status: ''
  },
  myQuestions: {
    errors: [],
    data: [],
    status: ''
  }
}), action) => createReducer(state, action, {

  ALL_QUESTIONS: (state, {...a}) => (console.log(...a),
    state.mergeDeep({ allQuestions: { ...a } })),

  MY_QUESTIONS: (state, {...a}) => (console.log(),
    state.set('myQuestions', { ...a })),

  TOP_QUESTIONS: (state, {...a }) =>
    state.set('topQuestions', { ...a }),

  SHIFT_QUESTION: (state, () =>
    state.setIn(['allQuestions', 'data'],
    state.getIn(['allQuestions', 'data']).shift()))

})
