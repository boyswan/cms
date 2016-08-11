import createActions from 'cms/helpers/createActions'
import { assign } from 'cms/helpers/utils'

const ApiActions = createActions([
  'hydrate',
  'saveData',
  'dragPost'
])

const UiActions = createActions([
  'closeForm',
  'setField',
  'addPage',
  'addPost',
  'deletePage',
  'deletePost'

])

export default assign(
  UiActions,
  ApiActions
)
