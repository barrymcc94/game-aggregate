import {authMiddleware} from '../index';

describe('MiddleWare', () => {
    it('tests authMiddleware flows with auth action', () => {
        const next = jest.fn();
        const action = {type: 'FETCH_GAMES_STARTED', payload: {query: {}}};
        authMiddleware({
            getState: () => ({
                auth: {giantbomb: {api_key: 'api_key'}},
            }),
        })(next)(action);
        expect(next).toBeCalledTimes(1);
    });

    it('tests authMiddleware flows with auth action & no query', () => {
        const next = jest.fn();
        const action = {type: 'FETCH_GAMES_STARTED', payload: {}};
        authMiddleware({
            getState: () => ({
                auth: {giantbomb: {api_key: 'api_key'}},
            }),
        })(next)(action);
        expect(next).toBeCalledTimes(1);
    });

    it('tests authMiddleware cancels auth action if api key is not set', () => {
        const next = jest.fn();
        const action = {type: 'FETCH_GAMES_STARTED', payload: {}};
        authMiddleware({
            getState: () => ({
                auth: {giantbomb: {api_key: null}},
            }),
        })(next)(action);
        expect(next).toBeCalledTimes(0);
    });

    it('tests authMiddleware is ignored when non relevent action is dispatched', () => {
        const next = jest.fn();
        const action = {type: 'TEST', payload: {}};
        authMiddleware({getState: () => ({})})(next)(action);
        expect(next).toBeCalledTimes(1);
    });
});
