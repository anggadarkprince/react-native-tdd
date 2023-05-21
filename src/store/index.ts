import {applyMiddleware, createStore} from 'redux';
import createSageMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sageMiddleware = createSageMiddleware();

const store = createStore(rootReducer, {}, applyMiddleware(sageMiddleware));

sageMiddleware.run(rootSaga);

export default store;
