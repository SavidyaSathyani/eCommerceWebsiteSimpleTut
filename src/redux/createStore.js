import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();
export const middlewares = [thunk, saga, logger];

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

saga.run(rootSaga);

export default store;
