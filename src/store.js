import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import reducers from './redux/reducers';
import sagas from './redux/sagas';
import {authMiddleware} from './redux/middleware';

const logger = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const middleWare = [thunk, authMiddleware, sagaMiddleWare, logger];

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(...middleWare))
);

sagaMiddleWare.run(sagas);

export default store;
