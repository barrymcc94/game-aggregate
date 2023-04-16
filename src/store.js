import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import reducers from './redux/reducers';
import sagas from './redux/sagas';
import {authMiddleware} from './redux/middleware';

const logger = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
const sagaMiddleWare = createSagaMiddleware();

const middleWare = [thunk, authMiddleware, sagaMiddleWare, logger];

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        ...middleWare,
    ],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
});

sagaMiddleWare.run(sagas);

export default store;
