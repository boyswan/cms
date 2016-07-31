import { identity } from './utils'

export default (state, action, reducers) => {
  const reducer = reducers[action.type] || identity
  return reducer(state, action)
}
