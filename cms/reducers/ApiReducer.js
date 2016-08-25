import { over, curry, compose, lensProp, lensIndex, set, lensPath } from 'ramda'
import createReducer from '../helpers/createReducer'

const pageLens = pageIndex => compose(
  lensPath(['cmsData', 'pages']),
  lensIndex(pageIndex),
)

const contentLens = ({ pageIndex, title }) => compose(
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

const move = (from, to) => array => {
  const element = array.splice(from, 1)[0]
  array.splice(to, 0, element);
  return array
}

export default (state = { cmsData: {} }, action) =>
  createReducer(state, action, {

    CMS_CONTENT: (state, { data }) => {
      return set(lensProp('cmsData'), data)(state)
    },

    SET_FIELD: (state, { value, ...a }) => {
      return set(contentLens(a), value)(state)
    },

    SET_POST_FIELD: (state, { value, ...a }) => {
      return set(postFieldLens(a), value)(state)
    },


    REORDER_POSTS: (state, { from, to, ...a }) => {
      return over(postLens(a), move(from, to))(state)
    }

  })
