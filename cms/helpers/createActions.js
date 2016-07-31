import store from 'cms/helpers/store'
import { actionFormat, curry } from 'cms/helpers/utils'

export default actions => actions.reduce((acc, type) =>
  (acc[type] = payload => store.dispatch(({
    ...payload,
    type: actionFormat(type)
  })), acc), {})
