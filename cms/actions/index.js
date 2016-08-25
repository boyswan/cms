import createActions from '../helpers/createActions'
import { assign } from '../helpers/utils'

const ApiActions = createActions([
  'hydrate',
  'saveData',
  'dragPost',
  'reorderPosts',
  'toggleGallery'
])

const UiActions = createActions([
  'toggleForm',
  'setField',
  'setPostField',
  'setPostImage',
  'addPage',
  'addPost',
  'deletePage',
  'deletePost'
])

export default assign(
  UiActions,
  ApiActions
)
