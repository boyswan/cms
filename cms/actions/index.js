import createActions from 'cms/helpers/createActions'
import { assign } from 'cms/helpers/utils'

const ApiActions = createActions([
  'hydrate',
  'saveData',
  'dragPost',
  'reorderPosts'
])

const UiActions = createActions([
  'closeForm',
  'setField',
  'setPostField',
  'addPage',
  'addPost',
  'deletePage',
  'deletePost'

])

export default assign(
  UiActions,
  ApiActions
)
