import createReducer from '../helpers/createReducer'
import { fromJS } from 'immutable'

export default (state = fromJS({
  cmsData: {}
}), action) => createReducer(state, action, {

  CMS_CONTENT: (state, { data }) => state.mergeDeep({
    'cmsData': data
  }),

  SET_FIELD: (state, { name, index, title, value }) => (console.log(),
    state.setIn(['cmsData', 'pages', index, 'content', title], value)
  ),

  SET_POST_FIELD: (state, { name, index, title, value, postIndex }) => (console.log(),
    state.setIn(['cmsData', 'pages', index, 'content', 'posts', postIndex, title], value)
  ),

  REORDER_POSTS: (state, { posts, index }) => (console.log(),
    state.setIn(['cmsData', 'pages', index, 'content', 'posts'], posts)
  )

})
