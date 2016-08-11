import createReducer from '../helpers/createReducer'
import { Map } from 'immutable'

export default (state = new Map({
  form: false
}), action) => createReducer(state, action, {

  CLOSE_FORM: (state, { status }) => (console.log(),
    state.set('form', false)
  ),

  ADD_POST: (state, { status }) => (console.log(),
    state
      .set('form', true)
  )

})
