import createActions from 'cms/helpers/createActions'
import { assign } from 'cms/helpers/utils'

const ApiActions = createActions([
  'hydrate',
  'saveData'
])

const UiActions = createActions([
  'setField'
])

export default assign(
  UiActions,
  ApiActions
)
