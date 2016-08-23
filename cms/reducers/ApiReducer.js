import createReducer from '../helpers/createReducer'
import { fromJS } from 'immutable'

export default (state = fromJS({
  cmsData: {}
}), action) => createReducer(state, action, {

  CMS_CONTENT: (state, { data }) => state.mergeDeep({
    'cmsData': data
  }),

  SET_FIELD: (state, { pageIndex, title, value }) => (console.log(),
    state.setIn(['cmsData', 'pages', pageIndex, 'content', title], value)
  ),

  SET_POST_FIELD: (state, { pageIndex, postIndex, title, value }) =>
    state.setIn(['cmsData', 'pages', 0, 'content', 'posts', 0, 'body'], value),

  REORDER_POSTS: (state, { posts, pageIndex }) => (console.log(),
    state.setIn(['cmsData', 'pages', pageIndex, 'content', 'posts'], posts)
  )

})
