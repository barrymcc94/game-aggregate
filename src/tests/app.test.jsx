import {dev, prod} from '../config';

describe('Root level tests', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it('tests correct config is returned', () => {
        process.env = {...process.env, NODE_ENV: 'development'};
        expect(require('../config').default.apiUrl).toEqual(dev.apiUrl);
    });

    it('tests correct config is returned', () => {
        process.env = {...process.env, NODE_ENV: 'production'};
        expect(require('../config').default.apiUrl).toEqual(prod.apiUrl);
    });
});
