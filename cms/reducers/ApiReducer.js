import createReducer from '../helpers/createReducer'
import { fromJS } from 'immutable'

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

export default (state = fromJS({
  cmsData: {}
}), action) => createReducer(state, action, {

  CMS_CONTENT: (state, { data }) => state.mergeDeep({
    'cmsData': data
  }),

  SET_FIELD: (state, { name, index, title, value }) => (console.log(),
    state.setIn(['cmsData', 'pages', index, 'content', title], value)
  ),

  DRAG_POST: (state, { from, to, post }) => {
    let source = state.getIn(['cmsData', 'pages', 1, 'content', 'posts', to ])
    let target = state.getIn(['cmsData', 'pages', 1, 'content', 'posts', from ])
    return state
      .updateIn(['cmsData', 'pages', 1, 'content', 'posts', to ], post => target)
      .updateIn(['cmsData', 'pages', 1, 'content', 'posts', from ], post => source)
    }
      // .updateIn(['cmsData', 'pages', 1, 'content', 'posts'], test => test.splice(hoverIndex, dragIndex))
      // .updateIn(['cmsData', 'pages', 1, 'content', 'posts'], test => console.log(test.toJS()))

      // .updateIn(['cmsData', 'pages'], test => 1)


})


//   pages: {
//     $splice: [
//       [dragIndex, 1],
//       [hoverIndex, 0, dragCard]
//     ]
