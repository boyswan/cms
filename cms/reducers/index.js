import createReducer from '../helpers/createReducer'
import { insert, remove, over, lensProp, set } from 'ramda'

import {
  pageLens,
  contentLens,
  postLens,
  postFieldLens,
  postImageLens
} from './paths'

export default (state = {
  cmsData: {},
  form: false,
  gallery: false
}, action) =>
  createReducer(state, action, {

    CMS_CONTENT: ({ data }) =>
      set(lensProp('cmsData'), data),

    SET_FIELD: ({ value, pageIndex, title }) =>
      set(contentLens(pageIndex, title), value),

    SET_POST_FIELD: ({ value, pageIndex, postIndex }) =>
      set(postFieldLens(pageIndex, postIndex), value),

    SET_POST_IMAGE: ({ value, pageIndex, postIndex }) =>
      set(postImageLens(pageIndex, postIndex), value),

    REORDER_POSTS: ({ from, to, pageIndex }) =>
      over(postLens(pageIndex), array => insert(to, array[from], remove(from, 1, array))),

    ADD_POST: ({ status }) =>
      set(lensProp('form'), true),

    TOGGLE_FORM: () => set(lensProp('form'), false),
    TOGGLE_GALLERY: () => set(lensProp('gallery'), false)

  })
