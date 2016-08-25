import { insert, remove, over, compose, lensProp, lensIndex, set, lensPath } from 'ramda'
import createReducer from '../helpers/createReducer'

const pageLens = pageIndex => compose(
  lensPath(['cmsData', 'pages']),
  lensIndex(pageIndex),
)

const contentLens = ( pageIndex, title ) => compose(
  pageLens(pageIndex),
  lensProp('content'),
  lensProp(title)
)

const postLens = ({ pageIndex }) => compose(
  pageLens(pageIndex),
  lensPath(['content', 'posts'])
)

const postFieldLens = ({ pageIndex, postIndex }) => compose(
  pageLens(pageIndex),
  lensPath(['content', 'posts']),
  lensIndex(postIndex),
  lensProp('body')
)

export default (state = { cmsData: {} }, action) =>
  createReducer(state, action, {

    CMS_CONTENT: ({ data }) =>
      set(lensProp('cmsData'), data),

    SET_FIELD: ({ value, pageIndex, title }) =>
      set(contentLens(pageIndex, title), value),

    SET_POST_FIELD: ({ value, ...a }) =>
      set(postFieldLens(a), value),

    REORDER_POSTS: ({ from, to, ...a }) =>
      over(postLens(a), array => insert(to, array[from], remove(from, 1, array)))

  })
