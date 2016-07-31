import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux';
import reducers from 'cms/reducers'
import sagas from 'cms/sagas'
const sagaMiddleware = createSagaMiddleware()

export default createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware
  )
)

sagaMiddleware.run(sagas)
