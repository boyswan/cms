import createActions from 'cms/helpers/createActions'
import { assign } from 'cms/helpers/utils'

const ApiActions = createActions([
  'hydrate'
])

const UiActions = createActions([
])

export default assign(
  UiActions,
  ApiActions
)
