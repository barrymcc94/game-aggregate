import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '../src/redux/reducers';

Enzyme.configure({adapter: new Adapter()});

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
