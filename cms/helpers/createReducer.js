import { identity } from './utils'

export default (state, action, reducers) => {
  const fn = reducers[action.type] || (x => y => y)
  return fn(action)(state);
}
