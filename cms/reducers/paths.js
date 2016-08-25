import { insert, remove, over, compose, lensProp, lensIndex, set, lensPath } from 'ramda'
import createReducer from '../helpers/createReducer'

export const pageLens = pageIndex => compose(
  lensPath(['cmsData', 'pages']),
  lensIndex(pageIndex),
)

export const contentLens = ( pageIndex, title ) => compose(
  pageLens(pageIndex),
  lensProp('content'),
  lensProp(title)
)

export const postLens = ( pageIndex ) => compose(
  pageLens(pageIndex),
  lensPath(['content', 'posts'])
)

export const postFieldLens = ( pageIndex, postIndex ) => compose(
  pageLens(pageIndex),
  lensPath(['content', 'posts']),
  lensIndex(postIndex),
  lensProp('body')
)

export const postImageLens = ( pageIndex, postIndex ) => compose(
  pageLens(pageIndex),
  lensPath(['content', 'posts']),
  lensIndex(postIndex),
  lensProp('src')
)
