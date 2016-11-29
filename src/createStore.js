import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import mySaga from './sagas';
import './ReactotronConfig';

const createStores = __DEV__ ? console.tron.createStore : createStore; 
const sagaMiddleware = createSagaMiddleware();
let middleware;

/* global __DEV__*/
if (__DEV__) {
  middleware = applyMiddleware(sagaMiddleware, createLogger());
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

export default (reducers, data = {}) => {
  // const store = Reactotron.createStore(reducers, data, middleware);
  const store = createStores(reducers, data, middleware);
  sagaMiddleware.run(mySaga);
  return store;
};
