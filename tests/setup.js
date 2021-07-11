import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '../src/redux/reducers';

const sagaMiddleWare = createSagaMiddleware();
export const mockStore = configureMockStore([thunk, sagaMiddleWare]);
global.testStore = mockStore({});
global.helperStore = createStore(
    reducers,
    {},
    compose(applyMiddleware(...[thunk, sagaMiddleWare]))
);

global.fetch = jest.fn(() => Promise.resolve({}));
global.Request = (url) => url;

class MockDate extends Date {
    constructor() {
        super('2020-06-14T00:00:00.000Z'); // add whatever date you'll expect to get
    }
}
global.Date = MockDate;
