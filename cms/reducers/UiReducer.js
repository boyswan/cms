import createReducer from '../helpers/createReducer'
import { Map } from 'immutable'

export default (state = new Map({
  fields: {}
}), action) => createReducer(state, action, {

})
