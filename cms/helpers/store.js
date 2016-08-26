import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from 'cms/reducers'
import sagas from 'cms/sagas'
const sagaMiddleware = createSagaMiddleware()



// const dog = (...a) => console.log(a)

// console.log(sagaMiddleware)

// const createThunkMiddleware = ({ dispatch, getState }) => next => action => {
//   console.log(action)
//   if (typeof action === 'function') {
//     return action(dispatch, getState, extraArgument);
//   }
//
//   return next(action);
// }



export default createStore(
  combineReducers({ api: reducers }),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)
