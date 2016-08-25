import { insert, remove, over, compose, lensProp, lensIndex, set, lensPath } from 'ramda'
import createReducer from '../helpers/createReducer'

export default (state = {
  form: false
}, action) => createReducer(state, action, {

  CLOSE_FORM: ({ status }) =>
    set(lensProp('form'), false),

  ADD_POST: ({ status }) =>
    set(lensProp('form'), true)

})
